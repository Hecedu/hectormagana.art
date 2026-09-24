import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ansiColor, AnsiCell, renderAnsiBorderCell } from "../Portfolio/asciiFrames";

type BorderTheme = { style: number; tick: number; reducedMotion: boolean };
type BorderReport = (theme: BorderTheme | null) => void;

const BorderReportContext = createContext<BorderReport | null>(null);

export function useBbsBorderReport() {
  return useContext(BorderReportContext);
}

function borderGlyph(cell: AnsiCell, key: number) {
  return <span key={key} style={{ color: ansiColor(cell.fg), backgroundColor: ansiColor(cell.bg) }}>{cell.char}</span>;
}

export default function BbsPageFrame({ children }: { children: React.ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0, fontSize: 16 });
  const [theme, setTheme] = useState<BorderTheme & { bannerActive: boolean }>({
    style: 0, tick: 0, reducedMotion: false, bannerActive: false,
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
  );

  const report = useCallback<BorderReport>((next) => {
    setTheme((current) => next
      ? { ...next, bannerActive: true }
      : { ...current, bannerActive: false });
  }, []);

  useEffect(() => {
    const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!query) return;
    const update = () => setPrefersReducedMotion(query.matches);
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (theme.bannerActive || prefersReducedMotion) return;
    const animation = window.setInterval(() => setTheme((current) => ({ ...current, tick: current.tick + 1 })), 50);
    return () => window.clearInterval(animation);
  }, [theme.bannerActive, prefersReducedMotion]);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () => {
      const border = frame.querySelector<HTMLElement>(".bbs-page-frame__border");
      const bounds = frame.getBoundingClientRect();
      const fontSize = border ? parseFloat(window.getComputedStyle(border).fontSize) || 16 : 16;
      setSize((current) => current.width === bounds.width && current.height === bounds.height && current.fontSize === fontSize
        ? current : { width: bounds.width, height: bounds.height, fontSize });
    };
    measure();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(frame);
    window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const columns = Math.max(4, Math.round(size.width / (size.fontSize * 0.6)));
  const rows = Math.max(3, Math.round(size.height / (size.fontSize * 1.05)));
  const tick = theme.reducedMotion || (!theme.bannerActive && prefersReducedMotion) ? 60 : theme.tick;
  const cell = (x: number, y: number) => renderAnsiBorderCell(theme.style, x, y, columns, rows, tick);
  const visible = size.width > 0 && size.height > 0;

  return (
    <BorderReportContext.Provider value={report}>
      <div ref={frameRef} className="bbs-page-frame">
        <div className="bbs-page-frame__content">{children}</div>
        <div className="bbs-page-frame__border" aria-hidden="true">
          {visible && <>
            <div className="bbs-page-frame__horizontal bbs-page-frame__top" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
              {Array.from({ length: columns }, (_, x) => borderGlyph(cell(x, 0), x))}
            </div>
            <div className="bbs-page-frame__vertical bbs-page-frame__left" style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}>
              {Array.from({ length: rows }, (_, y) => borderGlyph(cell(0, y), y))}
            </div>
            <div className="bbs-page-frame__vertical bbs-page-frame__right" style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}>
              {Array.from({ length: rows }, (_, y) => borderGlyph(cell(columns - 1, y), y))}
            </div>
            <div className="bbs-page-frame__horizontal bbs-page-frame__bottom" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
              {Array.from({ length: columns }, (_, x) => borderGlyph(cell(x, rows - 1), x))}
            </div>
          </>}
        </div>
      </div>
    </BorderReportContext.Provider>
  );
}
