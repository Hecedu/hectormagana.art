import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ansiColor, AnsiCell, cleanTerminalName, renderAnsiFrame, STYLE_NAMES } from "./asciiFrames";
import "./AsciiBanner.css";

const DEFAULT_NAME = "Héctor Magaña";

function shuffledStyles() {
  const order = STYLE_NAMES.map((_, index) => index);
  for (let index = order.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
  }
  return order;
}

function colorRuns(row: AnsiCell[]) {
  const runs: { text: string; fg: number; bg: number; href?: string }[] = [];
  row.forEach(({ char, fg, bg, href }) => {
    const last = runs[runs.length - 1];
    if (last && last.fg === fg && last.bg === bg && last.href === href) last.text += char;
    else runs.push({ text: char, fg, bg, href });
  });
  return runs;
}

function terminalColumns() {
  if (window.innerWidth < 600) return 30;
  if (window.innerWidth < 1200) return 56;
  return 96;
}

function prefersReducedMotion() {
  return typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function fitFrame(frame: HTMLPreElement, container: HTMLDivElement, rows: number, reset = false) {
  if (reset) {
    frame.style.fontSize = "";
  }
  const styles = window.getComputedStyle(container);
  const available = container.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight) - 2;
  const contentWidth = frame.scrollWidth;
  if (contentWidth > available && available > 0) {
    const fontSize = parseFloat(window.getComputedStyle(frame).fontSize);
    frame.style.fontSize = `${fontSize * available / contentWidth}px`;
  }
  const frameStyles = window.getComputedStyle(frame);
  const fontSize = parseFloat(frameStyles.fontSize) || 24;
  const lineHeight = parseFloat(frameStyles.lineHeight);
  const fittedLineHeight = Number.isFinite(lineHeight) && lineHeight >= fontSize ? lineHeight : fontSize * 1.05;
  frame.style.minHeight = `${Math.ceil(rows * fittedLineHeight)}px`;
}

export default function AsciiBanner() {
  const [name, setName] = useState(DEFAULT_NAME);
  const [draft, setDraft] = useState(DEFAULT_NAME);
  const [styleOrder] = useState(shuffledStyles);
  const [stylePosition, setStylePosition] = useState(0);
  const styleIndex = styleOrder[stylePosition];
  const [styleRun, setStyleRun] = useState(0);
  const [frame, setFrame] = useState(0);
  const [paused, setPaused] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);
  const [columns, setColumns] = useState(terminalColumns);
  const bannerRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const previousControlsOpenRef = useRef(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLPreElement>(null);
  const ansiFrame = renderAnsiFrame(styleIndex, name, frame, columns, reducedMotion);

  useEffect(() => {
    const toggleControls = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || !event.shiftKey || event.altKey || event.repeat ||
        (event.code !== "KeyB" && event.key.toLowerCase() !== "b")) return;
      event.preventDefault();
      setControlsOpen((current) => {
        if (!current) previousFocusRef.current = document.activeElement as HTMLElement;
        return !current;
      });
    };
    window.addEventListener("keydown", toggleControls);
    return () => window.removeEventListener("keydown", toggleControls);
  }, []);

  useEffect(() => {
    if (previousControlsOpenRef.current === controlsOpen) return;
    previousControlsOpenRef.current = controlsOpen;
    if (dialogOpen) return;
    if (controlsOpen) {
      const selected = controlsRef.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
      selected?.focus();
      selected?.scrollIntoView?.({ block: "nearest", inline: "nearest" });
    } else if (previousFocusRef.current?.isConnected) {
      previousFocusRef.current.focus();
    }
  }, [controlsOpen, dialogOpen]);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const update = () => setColumns(terminalColumns());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useLayoutEffect(() => {
    const inner = innerRef.current;
    const frame = frameRef.current;
    if (!inner || !frame) return;
    const fit = () => fitFrame(frame, inner, ansiFrame.length, true);
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [columns, name, styleIndex, ansiFrame.length]);

  useLayoutEffect(() => {
    if (innerRef.current && frameRef.current) fitFrame(frameRef.current, innerRef.current, ansiFrame.length);
  });

  useEffect(() => {
    setFrame(0);
  }, [styleIndex, styleRun]);

  useEffect(() => {
    if (paused || reducedMotion || dialogOpen) return;
    const animation = window.setInterval(() => setFrame((current) => current + 1), 50);
    return () => window.clearInterval(animation);
  }, [styleIndex, styleRun, paused, reducedMotion, dialogOpen]);

  useEffect(() => {
    if (paused || reducedMotion || dialogOpen) return;
    const rotation = window.setTimeout(() => setStylePosition((current) => (current + 1) % styleOrder.length), 9000);
    return () => window.clearTimeout(rotation);
  }, [styleIndex, styleRun, paused, reducedMotion, dialogOpen, styleOrder]);

  useEffect(() => {
    if (!dialogOpen) return;
    const banner = bannerRef.current;
    inputRef.current?.focus();
    return () => banner?.focus();
  }, [dialogOpen]);

  const chooseStyle = (index: number) => {
    setStylePosition(styleOrder.indexOf(index));
    setStyleRun((current) => current + 1);
  };

  const openDialog = () => {
    setDraft(name);
    setError("");
    setDialogOpen(true);
  };

  const handleBannerClick = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as Element).closest("a, button")) return;
    const { top, height } = event.currentTarget.getBoundingClientRect();
    if (event.clientY < top || event.clientY >= top + height / 2) return;
    openDialog();
  };

  const handleBannerKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    openDialog();
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setError("");
  };

  const submitName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextName = cleanTerminalName(draft);
    if (!nextName) {
      setError("Please enter a name.");
      inputRef.current?.focus();
      return;
    }
    setName(nextName);
    closeDialog();
  };

  const resetName = () => {
    setName(DEFAULT_NAME);
    setDraft(DEFAULT_NAME);
    setError("");
    closeDialog();
  };

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDialog();
    }
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("input, button:not([disabled])"));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <section
        ref={bannerRef}
        className={`ascii-banner ascii-banner--${styleIndex}`}
        aria-label="Animated ANSI name banner"
        aria-describedby="ascii-banner-instructions"
        tabIndex={0}
        onClick={handleBannerClick}
        onKeyDown={handleBannerKeyDown}
      >
        <div ref={innerRef} className="container ascii-banner__inner">
          <h2 className="ascii-banner__sr-only">{name}</h2>
          <span id="ascii-banner-instructions" className="ascii-banner__sr-only">Press Enter or Space to type your name.</span>
          <pre ref={frameRef} className="ascii-banner__frame" data-testid="ansi-frame">{ansiFrame.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {colorRuns(row).map((run, runIndex) => (
                run.href
                  ? <a key={runIndex} href={run.href} style={{ color: "var(--bbs-ink)", backgroundColor: ansiColor(run.bg) }}>{run.text}</a>
                  : <span key={runIndex} aria-hidden="true" style={{ color: ansiColor(run.fg), backgroundColor: ansiColor(run.bg) }}>{run.text}</span>
              ))}
              {rowIndex < ansiFrame.length - 1 ? <span aria-hidden="true">{"\n"}</span> : null}
            </React.Fragment>
          ))}</pre>
          {controlsOpen && <div ref={controlsRef} className="ascii-banner__controls" aria-label="ANSI animation controls">
            <div className="ascii-banner__styles" role="group" aria-label="Animation style">
              {styleOrder.map((index) => (
                <button
                  key={index}
                  type="button"
                  className="ascii-banner__style-button"
                  aria-pressed={styleIndex === index}
                  onClick={() => chooseStyle(index)}
                >{STYLE_NAMES[index]}</button>
              ))}
            </div>
            <button
              type="button"
              className="ascii-banner__pause-button"
              onClick={() => setPaused((current) => !current)}
              disabled={reducedMotion}
              aria-label={reducedMotion ? "Animation paused for reduced motion" : paused ? "Play animations" : "Pause animations"}
            >{paused || reducedMotion ? "Play" : "Pause"}</button>
          </div>}
        </div>
      </section>

      {dialogOpen && (
        <div className="ascii-banner__overlay">
          <div
            ref={dialogRef}
            className="ascii-banner__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ascii-banner-dialog-title"
            aria-describedby="ascii-banner-dialog-description"
            onKeyDown={handleDialogKeyDown}
          >
            <div className="ascii-banner__dialog-heading">
              <h2 id="ascii-banner-dialog-title">Your name on the BBS</h2>
              <button type="button" className="ascii-banner__close" onClick={closeDialog} aria-label="Close name dialog">×</button>
            </div>
            <p id="ascii-banner-dialog-description">Type a name to preview it in every animation style.</p>
            <form onSubmit={submitName}>
              <label htmlFor="ascii-banner-name-input">Name</label>
              <input
                ref={inputRef}
                id="ascii-banner-name-input"
                type="text"
                value={draft}
                maxLength={40}
                autoComplete="off"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "ascii-banner-error" : undefined}
                onChange={(event) => { setDraft(event.target.value); setError(""); }}
              />
              {error && <p id="ascii-banner-error" role="alert" className="ascii-banner__error">{error}</p>}
              <div className="ascii-banner__dialog-actions">
                <button type="submit">Preview</button>
                <button type="button" onClick={resetName}>Reset</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
