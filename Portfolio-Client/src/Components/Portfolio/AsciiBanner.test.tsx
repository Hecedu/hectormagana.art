import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import AsciiBanner from "./AsciiBanner";
import { frameText, PROFILE_LINKS, renderAnsiFrame, serializeAnsiFrame, STYLE_NAMES } from "./asciiFrames";

function mockMotionPreference(reduced: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: jest.fn().mockImplementation(() => ({
      matches: reduced,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  });
}

let randomSpy: jest.SpyInstance;

beforeEach(() => {
  jest.useFakeTimers();
  mockMotionPreference(false);
  randomSpy = jest.spyOn(Math, "random").mockReturnValue(0.999999);
});

afterEach(() => {
  randomSpy.mockRestore();
  jest.useRealTimers();
});

function toggleControls(modifier: "metaKey" | "ctrlKey" = "metaKey") {
  fireEvent.keyDown(window, { key: "B", code: "KeyB", shiftKey: true, [modifier]: true });
}

function mockBannerBounds(banner: HTMLElement) {
  jest.spyOn(banner, "getBoundingClientRect").mockReturnValue({ top: 100, height: 200 } as DOMRect);
}

test("renders clickable profile links inside the animated frame", () => {
  render(<AsciiBanner />);
  const frame = screen.getByTestId("ansi-frame");
  expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/in/hecedu/");
  expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/Hecedu");
  expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute("href", "https://docs.google.com/document/d/e/2PACX-1vRvf27qHY0aa3-MtCL6QHPSe5C0iK7vxqAEGT7xALxI_SNLoWf7LSVp_xulV3VpIB8JMiwzpg9ZpB0d/pub");
  expect(frame.querySelectorAll("a")).toHaveLength(3);
  frame.querySelectorAll("a").forEach((link) => expect(link).toHaveStyle({ color: "var(--bbs-ink)" }));
  expect(frame.textContent).toMatch(/Héctor Magaña[^\n]*\n[^\n]*LinkedIn  GitHub  Resume/);
});

test("opens the name prompt only from the upper half of the card without intercepting links or controls", () => {
  render(<AsciiBanner />);
  const banner = screen.getByRole("region", { name: "Animated ANSI name banner" });
  mockBannerBounds(banner);
  expect(screen.queryByRole("button", { name: /You think this looks cool/ })).not.toBeInTheDocument();

  const link = screen.getByRole("link", { name: "GitHub" });
  link.addEventListener("click", (event) => event.preventDefault(), { once: true });
  fireEvent.click(link, { clientY: 150 });
  fireEvent.keyDown(link, { key: "Enter" });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  toggleControls();
  fireEvent.click(screen.getByRole("button", { name: "Pacman" }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  fireEvent.click(banner, { clientY: 250 });
  fireEvent.click(banner, { clientY: 200 });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  fireEvent.click(banner, { clientY: 150 });
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Close name dialog" }));

  banner.focus();
  fireEvent.keyDown(banner, { key: "Enter" });
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Close name dialog" }));

  fireEvent.keyDown(banner, { key: " " });
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

test("keeps the links immediately below the name and inside every border", () => {
  for (const columns of [30, 56, 96]) {
    for (let style = 0; style < STYLE_NAMES.length; style += 1) {
      const frame = renderAnsiFrame(style, "Héctor Magaña", 20, columns);
      const rows = frame.map((row) => row.map(({ char }) => char).join(""));
      const nameRow = rows.findIndex((row) => row.includes("Héctor Magaña"));
      expect(nameRow).toBeGreaterThan(0);
      expect(rows[nameRow + 1]).toContain("LinkedIn  GitHub  Resume");
      expect(frame[nameRow + 1][0].char).not.toBe(" ");
      expect(frame[nameRow + 1][columns - 1].char).not.toBe(" ");
    }
  }
});

test("keeps names and links in a compact footer at every width and style", () => {
  for (const columns of [30, 56, 96]) {
    for (const name of ["Héctor Magaña", "A longer name that wraps across lines"]) {
      const chars = Array.from(name);
      const expectedLines: string[] = [];
      for (let offset = 0; offset < chars.length; offset += columns - 4) {
        expectedLines.push(chars.slice(offset, offset + columns - 4).join(""));
      }

      for (let style = 0; style < STYLE_NAMES.length; style += 1) {
        const rows = renderAnsiFrame(style, name, 20, columns).map((row) => row.map(({ char }) => char).join(""));
        const nameTop = rows.length - expectedLines.length - 3;
        expect(rows.slice(nameTop, nameTop + expectedLines.length).map((row) => row.slice(1, -1).trim()))
          .toEqual(expectedLines);
        expect(rows[rows.length - 3]).toContain("LinkedIn  GitHub  Resume");
        expect(rows[rows.length - 2].slice(1, -1).trim()).toBe("");
      }
    }
  }
});

test("keeps the frame height constant while animation styles rotate", () => {
  for (const columns of [30, 56, 96]) {
    for (const name of ["Héctor Magaña", "ABCDEFGHIJKLMNOPQRST", "A longer name that wraps across lines"]) {
      const heights = STYLE_NAMES.map((_, style) => renderAnsiFrame(style, name, 20, columns).length);
      expect(new Set(heights).size).toBe(1);
    }
  }
});

test("reserves the same rendered frame height after switching styles", () => {
  render(<AsciiBanner />);
  const frame = screen.getByTestId("ansi-frame");
  const reservedHeight = frame.style.minHeight;
  expect(reservedHeight).toMatch(/^\d+px$/);

  toggleControls();
  fireEvent.click(screen.getByRole("button", { name: "Pacman" }));
  expect(frame.style.minHeight).toBe(reservedHeight);
});

test("scales reserved frame height with the fitted font on narrow screens", () => {
  const { container } = render(<AsciiBanner />);
  const frame = screen.getByTestId("ansi-frame") as HTMLPreElement;
  const inner = container.querySelector(".ascii-banner__inner") as HTMLDivElement;
  const rows = frame.textContent!.split("\n").length;
  let containerWidth = 320;
  Object.defineProperty(inner, "clientWidth", { configurable: true, get: () => containerWidth });
  Object.defineProperty(frame, "scrollWidth", {
    configurable: true,
    get: () => 600 * parseFloat(frame.style.fontSize || "24") / 24,
  });
  const originalGetComputedStyle = window.getComputedStyle.bind(window);
  const computedStyle = jest.spyOn(window, "getComputedStyle").mockImplementation((element) => {
    if (element === inner) return { paddingLeft: "12px", paddingRight: "12px" } as CSSStyleDeclaration;
    if (element === frame) {
      const fontSize = parseFloat(frame.style.fontSize || "24");
      return { fontSize: `${fontSize}px`, lineHeight: `${fontSize * 1.05}px` } as CSSStyleDeclaration;
    }
    return originalGetComputedStyle(element);
  });

  try {
    fireEvent.resize(window);
    const widerHeight = parseFloat(frame.style.minHeight);
    expect(widerHeight).toBe(Math.ceil(rows * 24 * 294 / 600 * 1.05));

    containerWidth = 220;
    fireEvent.resize(window);
    expect(parseFloat(frame.style.minHeight)).toBe(Math.ceil(rows * 24 * 194 / 600 * 1.05));
    expect(parseFloat(frame.style.minHeight)).toBeLessThan(widerHeight);
  } finally {
    computedStyle.mockRestore();
  }
});

test("hides controls until the keyboard shortcut and restores focus when closed", () => {
  render(<AsciiBanner />);
  const banner = screen.getByRole("region", { name: "Animated ANSI name banner" });
  banner.focus();
  expect(screen.queryByRole("group", { name: "Animation style" })).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "Pause animations" })).not.toBeInTheDocument();

  fireEvent.keyDown(window, { key: "B", code: "KeyB", metaKey: true });
  expect(screen.queryByRole("group", { name: "Animation style" })).not.toBeInTheDocument();
  toggleControls();
  expect(screen.getByRole("button", { name: "Chromatic frame" })).toHaveFocus();
  expect(screen.getByRole("button", { name: "Pause animations" })).toBeInTheDocument();
  toggleControls();
  expect(screen.queryByRole("group", { name: "Animation style" })).not.toBeInTheDocument();
  expect(banner).toHaveFocus();

  toggleControls("ctrlKey");
  expect(screen.getByRole("group", { name: "Animation style" })).toBeInTheDocument();
  toggleControls("ctrlKey");
  expect(screen.queryByRole("button", { name: "Pause animations" })).not.toBeInTheDocument();
});

test("offers all seventeen styles and rotates them every nine seconds", () => {
  render(<AsciiBanner />);

  const styles = ["Chromatic frame", "Dissolve mosaic", "Clock sweep", "Prismatic wave", "Rising flames", "Gem Glow", "Matrix", "Snow Fall", "Autumn Leaves", "The Cosmos", "Space Invaders", "Pacman", "Thunder Storm", "Pendulum", "Mayan Ruins", "Candles in the dark", "Earth globe"];
  expect(STYLE_NAMES).toEqual(styles);
  toggleControls();
  styles.forEach((style) => expect(screen.getByRole("button", { name: style })).toBeInTheDocument());
  expect(screen.getByRole("heading", { name: "Héctor Magaña" })).toBeInTheDocument();

  act(() => jest.advanceTimersByTime(9000));
  expect(screen.getByRole("button", { name: "Dissolve mosaic" })).toHaveAttribute("aria-pressed", "true");

  fireEvent.click(screen.getByRole("button", { name: "Pause animations" }));
  act(() => jest.advanceTimersByTime(12000));
  expect(screen.getByRole("button", { name: "Dissolve mosaic" })).toHaveAttribute("aria-pressed", "true");

  fireEvent.click(screen.getByRole("button", { name: "Play animations" }));
  fireEvent.click(screen.getByRole("button", { name: "Earth globe" }));
  expect(screen.getByRole("button", { name: "Earth globe" })).toHaveAttribute("aria-pressed", "true");
  act(() => jest.advanceTimersByTime(9000));
  expect(screen.getByRole("button", { name: "Chromatic frame" })).toHaveAttribute("aria-pressed", "true");
});

test("shuffles every style once on each page entry and follows the new order", () => {
  randomSpy.mockReturnValue(0);
  const firstVisit = render(<AsciiBanner />);
  toggleControls();
  const orderedStyles = () => Array.from(screen.getByRole("group", { name: "Animation style" }).querySelectorAll("button"))
    .map((button) => button.textContent);

  expect(orderedStyles()).toEqual([...STYLE_NAMES.slice(1), STYLE_NAMES[0]]);
  expect(screen.getByRole("button", { name: "Dissolve mosaic" })).toHaveAttribute("aria-pressed", "true");
  act(() => jest.advanceTimersByTime(9000));
  expect(screen.getByRole("button", { name: "Clock sweep" })).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(screen.getByRole("button", { name: "Chromatic frame" }));
  act(() => jest.advanceTimersByTime(9000));
  expect(screen.getByRole("button", { name: "Dissolve mosaic" })).toHaveAttribute("aria-pressed", "true");

  firstVisit.unmount();
  randomSpy.mockReturnValue(0.999999);
  render(<AsciiBanner />);
  toggleControls();
  expect(orderedStyles()).toEqual([...STYLE_NAMES]);
  expect(screen.getByRole("button", { name: "Chromatic frame" })).toHaveAttribute("aria-pressed", "true");
});

test("pausing freezes the current text animation frame", () => {
  render(<AsciiBanner />);
  act(() => jest.advanceTimersByTime(1200));
  const frame = screen.getByTestId("ansi-frame");
  const partialName = frame.textContent;
  expect(partialName).toContain("Héctor Magaña");
  toggleControls();
  fireEvent.click(screen.getByRole("button", { name: "Pause animations" }));
  act(() => jest.advanceTimersByTime(2500));
  expect(frame.textContent).toBe(partialName);
});

test("all styles move character shapes and keep the exact name visible", () => {
  for (const columns of [30, 56, 96]) {
    for (let style = 0; style < STYLE_NAMES.length; style += 1) {
      const frames = [0, 6, 12, 30, 45, 90, 150, 179]
        .map((tick) => renderAnsiFrame(style, "Héctor Magaña", tick, columns));
      frames.forEach((frame) => {
        frame.forEach((row) => expect(row).toHaveLength(columns));
        expect(frameText(frame)).toContain("Héctor Magaña");
        const artwork = PROFILE_LINKS.reduce((text, link) => text.replace(link.label, ""), frameText(frame).replace("Héctor Magaña", ""));
        expect(artwork).not.toMatch(/[A-Za-z]/);
      });
      expect(frameText(frames[0])).not.toBe(frameText(frames[3]));
      expect(frameText(frames[3])).not.toBe(frameText(frames[4]));
      expect(frameText(frames[6])).not.toBe(frameText(frames[7]));
      expect(renderAnsiFrame(style, "Héctor Magaña", 0, columns, true))
        .toEqual(renderAnsiFrame(style, "Héctor Magaña", 120, columns, true));
    }
  }
});

test("each scene has its own moving border with stable corners", () => {
  const border = (style: number, tick: number, columns: number) => {
    const frame = renderAnsiFrame(style, "Héctor Magaña", tick, columns);
    const last = frame.length - 1;
    expect([frame[0][0].char, frame[0][columns - 1].char, frame[last][0].char, frame[last][columns - 1].char])
      .toEqual(["╔", "╗", "╚", "╝"]);
    return [...frame[0], ...frame.slice(1, -1).flatMap((row) => [row[0], row[columns - 1]]), ...frame[last]]
      .map(({ char, fg, bg }) => `${char}:${fg}:${bg}`).join("|");
  };

  for (const columns of [30, 56, 96]) {
    const signatures = STYLE_NAMES.map((_, style) => {
      const initial = border(style, 0, columns);
      expect(border(style, 20, columns)).not.toBe(initial);
      expect(border(style, 60, columns)).not.toBe(initial);
      return border(style, 20, columns);
    });
    expect(new Set(signatures).size).toBe(STYLE_NAMES.length);
  }
});

test("Matrix border stays green throughout its animation", () => {
  for (const columns of [30, 56, 96]) {
    for (let tick = 0; tick < 180; tick += 1) {
      const frame = renderAnsiFrame(6, "Héctor Magaña", tick, columns);
      const border = [...frame[0], ...frame.slice(1, -1).flatMap((row) => [row[0], row[columns - 1]]), ...frame[frame.length - 1]];
      expect(border.every(({ fg }) => [28, 46, 82, 118].includes(fg))).toBe(true);
    }
  }
});

test("new themes have distinct terminal glyph compositions", () => {
  const samples = [20, 45, 70].map((tick) =>
    [5, 6, 7, 8, 9].map((style) => frameText(renderAnsiFrame(style, "Héctor Magaña", tick, 96)))
  );
  expect(samples.some((frames) => /[◆◇]/.test(frames[0]))).toBe(true);
  expect(samples.some((frames) => /[01┊¦]/.test(frames[1]))).toBe(true);
  expect(samples.some((frames) => /[✳▄]/.test(frames[2]))).toBe(true);
  expect(samples.some((frames) => /[◆◇╱╲]/.test(frames[3]))).toBe(true);
  expect(samples.some((frames) => /[✦+*]/.test(frames[4]))).toBe(true);
});

test("Clock sweep, Gem Glow, and The Cosmos reach the rows above the footer", () => {
  for (const columns of [30, 56, 96]) {
    for (const style of [2, 5, 9]) {
      for (const tick of [0, 20, 45, 70]) {
        const frame = renderAnsiFrame(style, "Héctor Magaña", tick, columns);
        const lowerArtwork = frame.slice(frame.length - 9, frame.length - 5)
          .flatMap((row) => row.slice(1, -1));
        expect(lowerArtwork.some(({ char }) => char !== " ")).toBe(true);
      }
    }
  }
});

test("Gem Glow animates the space between the lettering and lower gems", () => {
  for (const columns of [30, 56, 96]) {
    for (const tick of [0, 20, 45, 70]) {
      const frame = renderAnsiFrame(5, "Héctor Magaña", tick, columns);
      const middleArtwork = frame.slice(frame.length - 15, frame.length - 11)
        .flatMap((row) => row.slice(1, -1));
      expect(middleArtwork.some(({ char }) => char === "◇" || char === "·")).toBe(true);
    }
  }
});

test("Snow Fall mountains and ground stay fixed while snow moves", () => {
  for (const columns of [30, 56, 96]) {
    const initial = renderAnsiFrame(7, "Héctor Magaña", 0, columns);
    const nameRow = initial.findIndex((row) => row.map(({ char }) => char).join("").includes("Héctor Magaña"));
    const mountainCells: { x: number; y: number }[] = [];
    for (let y = nameRow - 7; y < nameRow - 1; y += 1) {
      for (let x = 2; x < columns - 2; x += 1) {
        if (/[▲╱╲▓]/.test(initial[y][x].char)) mountainCells.push({ x, y });
      }
    }
    expect(mountainCells.length).toBeGreaterThan(columns);
    for (const tick of [20, 60, 120, 179]) {
      const frame = renderAnsiFrame(7, "Héctor Magaña", tick, columns);
      mountainCells.forEach(({ x, y }) => expect(frame[y][x]).toEqual(initial[y][x]));
      expect(frame[frame.length - 1]).toEqual(initial[initial.length - 1]);
      expect(frameText(frame)).not.toBe(frameText(initial));
    }
  }
});

test("arcade and scenic themes draw recognizable moving silhouettes", () => {
  const frames = [0, 20, 45, 70].map((tick) =>
    [10, 11, 12, 13, 14, 15, 16].map((style) => frameText(renderAnsiFrame(style, "Héctor Magaña", tick, 96)))
  );
  expect(frames.some((row) => /[▲↑]/.test(row[0]))).toBe(true);
  expect(frames.some((row) => /[◕║]/.test(row[1]))).toBe(true);
  expect(frames.some((row) => /[╱╲]/.test(row[2]))).toBe(true);
  expect(frames.some((row) => /[◉◯┬]/.test(row[3]))).toBe(true);
  expect(frames.some((row) => /[▦▟]/.test(row[4]))).toBe(true);
  expect(frames.some((row) => /[▐▌♠]/.test(row[5]))).toBe(true);
  expect(frames.some((row) => /◌/.test(row[6]))).toBe(true);
  for (let style = 10; style < STYLE_NAMES.length; style += 1) {
    expect(frames[0][style - 10]).not.toBe(frames[1][style - 10]);
  }
});

test("Space Invaders keeps white enemies above the white player ship", () => {
  for (const columns of [30, 56, 96]) {
    for (let tick = 0; tick < 180; tick += 1) {
      const frame = renderAnsiFrame(10, "Héctor Magaña", tick, columns);
      const nameRow = frame.findIndex((row) => row.map(({ char }) => char).join("").includes("Héctor Magaña"));
      const shipX = Math.round((columns - 1) / 2 + Math.sin(tick * 0.07) * columns * 0.27);
      const craft = (y: number) => frame[y].map((cell, x) => ({ ...cell, x }))
        .filter(({ char }) => /[▲▄█]/.test(char));
      const player = [...craft(nameRow - 4), ...craft(nameRow - 3)];
      expect(player).toHaveLength(6);
      expect(player.every(({ x, fg }) => x >= shipX - 2 && x <= shipX + 2 && fg === 231)).toBe(true);
      const enemyRows = columns < 56 ? [nameRow - 8] : [2, nameRow - 8];
      const enemies = enemyRows.flatMap((y) => [y, y + 1, y + 2].flatMap(craft));
      expect(enemies.length).toBeGreaterThan(0);
      expect(enemies.every(({ fg }) => fg === 231)).toBe(true);
    }
  }
});

test("Pacman and the ghost fully exit before reversing their chase offscreen", () => {
  for (const columns of [30, 56, 96]) {
    const actors = (tick: number) => {
      const frame = renderAnsiFrame(11, "Héctor Magaña", tick, columns);
      const nameRow = frame.findIndex((row) => row.map(({ char }) => char).join("").includes("Héctor Magaña"));
      const laneY = nameRow - 7;
      const cells = frame.slice(laneY, laneY + 5).flatMap((row, dy) =>
        row.slice(1, -1).map((cell, x) => ({ ...cell, x: x + 1, y: laneY + dy })));
      const pac = cells.filter(({ fg }) => fg === 226);
      const ghostColor = Math.floor(tick / 80) % 2 === 0 ? 21 : 39;
      const ghost = cells.filter(({ fg }) => fg === ghostColor);
      const eyes = cells.filter(({ char, fg }) => char === "◉" && fg === 231);
      return { pac, ghost, eyes, laneY };
    };
    for (const tick of [0, 79, 80, 159, 160]) {
      const { pac, ghost, eyes } = actors(tick);
      expect([...pac, ...ghost, ...eyes]).toHaveLength(0);
      expect(frameText(renderAnsiFrame(11, "Héctor Magaña", tick, columns))).not.toMatch(/[◕◉]/);
    }
    for (const runStart of [0, 80]) {
      const entering = Array.from({ length: 20 }, (_, offset) => actors(runStart + offset))
        .find(({ pac, ghost }) => pac.length + ghost.length > 0);
      expect(entering).toBeDefined();
      expect(Math.max(...[...entering!.pac, ...entering!.ghost].map(({ x }) => x))).toBeLessThanOrEqual(2);
      const leaving = Array.from({ length: 20 }, (_, offset) => actors(runStart + 60 + offset))
        .filter(({ pac, ghost }) => pac.length + ghost.length > 0).pop();
      expect(leaving).toBeDefined();
      expect(Math.min(...[...leaving!.pac, ...leaving!.ghost].map(({ x }) => x))).toBeGreaterThanOrEqual(columns - 3);
    }
    for (const [start, end] of [[30, 45], [110, 125]]) {
      let previous: { pacX: number; ghostX: number } | null = null;
      for (let tick = start; tick <= end; tick += 1) {
        const { pac, ghost, eyes, laneY } = actors(tick);
        expect(pac.length).toBeGreaterThan(0);
        expect(ghost.length).toBeGreaterThan(0);
        expect(eyes).toHaveLength(2);
        expect(eyes.every(({ y }) => y === laneY + 2)).toBe(true);
        const pacX = Math.min(...pac.map(({ x }) => x));
        const ghostX = Math.min(...ghost.map(({ x }) => x));
        if (start === 30) expect(Math.max(...pac.map(({ x }) => x))).toBeLessThan(ghostX);
        else expect(Math.max(...ghost.map(({ x }) => x))).toBeLessThan(pacX);
        if (previous) expect(pacX - previous.pacX).toBe(ghostX - previous.ghostX);
        previous = { pacX, ghostX };
      }
    }
  }
});

test("Pacman has an opening mouth and the ghost has white eyes and scalloped feet", () => {
  for (const columns of [30, 96]) {
    const scene = (tick: number) => {
      const frame = renderAnsiFrame(11, "Héctor Magaña", tick, columns);
      const nameRow = frame.findIndex((row) => row.map(({ char }) => char).join("").includes("Héctor Magaña"));
      const laneY = nameRow - 7;
      const pacX = frame[laneY + 1].findIndex(({ fg }, x) => x > 0 && x < columns - 1 && fg === 226);
      const ghostColor = tick < 80 ? 21 : 39;
      const ghostX = frame[laneY + 1].findIndex(({ fg }) => fg === ghostColor);
      return { frame, laneY, pacX, ghostX, ghostColor };
    };
    const open = scene(36);
    const closed = scene(33);
    expect(open.frame[open.laneY][open.pacX].char).toBe(" ");
    expect(open.frame[open.laneY + 2][open.pacX + 4].char).toBe(" ");
    expect(closed.frame[closed.laneY + 2][closed.pacX + 4].char).toBe("█");
    for (const tick of [36, 116]) {
      const { frame, laneY, ghostX, ghostColor } = scene(tick);
      expect(frame[laneY + 4].slice(ghostX, ghostX + 6).map(({ char }) => char).join("").trimEnd()).toBe("▀ ▀ ▀");
      expect(frame[laneY + 2].slice(ghostX + 2, ghostX + 4)
        .every(({ char, fg, bg }) => char === "◉" && fg === 231 && bg === ghostColor)).toBe(true);
    }
  }
});

test("Pacman background keeps its blue maze and yellow pellets at every width", () => {
  for (const columns of [30, 56, 96]) {
    const frame = renderAnsiFrame(11, "Héctor Magaña", 20, columns);
    const nameRow = frame.findIndex((row) => row.map(({ char }) => char).join("").includes("Héctor Magaña"));
    const maze = frame.flatMap((row, y) => row.map(({ fg, char }, x) => fg === 27 ? `${x}:${y}:${char}` : null)
      .filter((cell): cell is string => cell !== null));
    const pellets = frame.flatMap((row, y) => row.map(({ fg, char }, x) => fg === 226 && char === "●" ? `${x}:${y}` : null)
      .filter((cell): cell is string => cell !== null));
    expect(maze.length).toBeGreaterThan(columns);
    expect(maze.some((cell) => cell.endsWith(":╔"))).toBe(true);
    expect(frame[nameRow - 2].slice(2, -2).filter(({ fg }) => fg === 27).length).toBeGreaterThanOrEqual(columns - 6);
    expect(pellets.length).toBeGreaterThan(2);
    const mazeTop = frame.findIndex((row) => row.some(({ char, fg }) => char === "╔" && fg === 27));
    const mazeLeft = frame[mazeTop].findIndex(({ char, fg }) => char === "╔" && fg === 27);
    const mazeRight = frame[mazeTop].findIndex(({ char, fg }) => char === "╗" && fg === 27);
    const mazeBottom = frame.findIndex((row, y) => y > mazeTop && row[mazeLeft].char === "╚" && row[mazeLeft].fg === 27);
    for (const tick of [0, 60, 80, 159]) {
      const next = renderAnsiFrame(11, "Héctor Magaña", tick, columns);
      expect(next.slice(mazeTop + 1, mazeBottom).flatMap((row) => row.slice(mazeLeft + 1, mazeRight))
        .every(({ char }) => char !== "●")).toBe(true);
      expect(next.flatMap((row, y) => row.map(({ fg, char }, x) => fg === 27 ? `${x}:${y}:${char}` : null)
        .filter((cell): cell is string => cell !== null))).toEqual(maze);
      expect(next.flatMap((row, y) => row.map(({ fg, char }, x) => fg === 226 && char === "●" ? `${x}:${y}` : null)
        .filter((cell): cell is string => cell !== null))).toEqual(pellets);
      expect([...next[0], ...next[next.length - 1]].every(({ fg }) => fg === 220 || fg === 226)).toBe(true);
    }
  }
});

test("new scenes retain their signature artwork in the narrow layout", () => {
  const mobile = [10, 11, 12, 13, 14, 15, 16]
    .map((style) => frameText(renderAnsiFrame(style, "Héctor Magaña", 20, 30)));
  [/[▄]█▄/, /▄██/, /▄▄/, /◉/, /▟/, /▐█▌/, /◌/]
    .forEach((shape, index) => expect(mobile[index]).toMatch(shape));
});

test("Thunder Storm lightning bolts are yellow during a flash", () => {
  for (const columns of [30, 56, 96]) {
    const yellowBolt = (tick: number) => renderAnsiFrame(12, "Héctor Magaña", tick, columns)
      .slice(2, -2).flatMap((row) => row.slice(2, -2))
      .filter(({ char, fg }) => /[╱╲]/.test(char) && fg === 226);
    expect(yellowBolt(0).length).toBeGreaterThan(0);
    expect(yellowBolt(5)).toHaveLength(0);
  }
});

test("Mayan Ruins keeps gray stone, gold pyramid tips, green ground, and a matching frame", () => {
  const stone = [240, 244, 248, 252];
  const grass = [28, 34, 40];
  for (const columns of [30, 56, 96]) {
    for (const tick of [0, 60]) {
      const frame = renderAnsiFrame(14, "Héctor Magaña", tick, columns);
      const nameRow = frame.findIndex((row) => row.map(({ char }) => char).join("").includes("Héctor Magaña"));
      const scene = frame.slice(2, nameRow - 1).flatMap((row) => row.slice(2, -2));
      expect(scene.some(({ char, fg }) => char === "▟" && stone.includes(fg))).toBe(true);
      expect(scene.some(({ char, fg }) => char === "◆" && fg === 220)).toBe(true);
      expect(frame[nameRow - 2].some(({ char, fg }) => /[▒▄]/.test(char) && grass.includes(fg))).toBe(true);
      const border = [...frame[0], ...frame[frame.length - 1], ...frame.slice(1, -1).flatMap((row) => [row[0], row[columns - 1]])];
      expect(border.every(({ fg }) => [...stone, ...grass, 220].includes(fg))).toBe(true);
      expect(frame[frame.length - 1].some(({ fg }) => grass.includes(fg))).toBe(true);
    }
  }
});

test("Pendulum bobs swing on an arc beneath fixed pivots", () => {
  for (const columns of [30, 56, 96]) {
    const count = columns < 56 ? 2 : 3;
    const pivotX = Math.round(0.5 * columns / count);
    const firstPendulumRight = pivotX + columns / (count * 2.5) + 1;
    const ticks = [0, 12, 24, 36, 48, 60, 72, 84, 96];
    const frames = ticks.map((tick) => renderAnsiFrame(13, "Héctor Magaña", tick, columns));
    const pivots = frames.map((frame) => frame[0].map(({ char }, x) => char === "┬" ? x : -1).filter((x) => x >= 0));
    pivots.forEach((positions) => expect(positions).toEqual(pivots[0]));

    const bobs = frames.map((frame, index) => {
      for (let y = 1; y < frame.length - 1; y += 1) {
        for (let x = 1; x < firstPendulumRight; x += 1) {
          if (frame[y].slice(x, x + 3).every(({ char, fg }) => char === "◉" && fg === 159)) return { x: x + 1, y };
        }
      }
      throw new Error(`First pendulum bob is missing at width ${columns}, tick ${ticks[index]}`);
    });
    const radii = bobs.map(({ x, y }) => Math.hypot(x - pivotX, y - 2));
    expect(Math.max(...radii) - Math.min(...radii)).toBeLessThan(1.5);
    expect(bobs[0].y).toBeGreaterThan(bobs[2].y);
    expect(bobs[4].y).toBeGreaterThan(bobs[6].y);
    expect(bobs[2].x).toBeGreaterThan(pivotX);
    expect(bobs[6].x).toBeLessThan(pivotX);
  }
});

test("candles start unlit and reveal the name as they ignite", () => {
  for (const columns of [30, 56, 96]) {
    const dark = renderAnsiFrame(15, "Héctor Magaña", 0, columns);
    const lighting = renderAnsiFrame(15, "Héctor Magaña", 8, columns);
    const lit = renderAnsiFrame(15, "Héctor Magaña", 20, columns);
    const nameCells = (frame: ReturnType<typeof renderAnsiFrame>) => {
      const row = frame.find((cells) => cells.map(({ char }) => char).join("").includes("Héctor Magaña"));
      return row!.filter(({ char }) => "Héctor Magaña".includes(char) && char !== " ");
    };
    const nameRow = dark.findIndex((row) => row.map(({ char }) => char).join("").includes("Héctor Magaña"));
    const letterCells = dark.slice(1, nameRow - 8).flat().filter(({ char }) => char === "█" || char === "▓");

    expect(frameText(dark)).not.toMatch(/[♦♠]/);
    expect(letterCells.length).toBeGreaterThan(0);
    expect(letterCells.every(({ fg }) => fg === 0)).toBe(true);
    expect(nameCells(dark).every(({ fg }) => fg === 0)).toBe(true);
    expect(nameCells(lighting).some(({ fg }) => fg > 0 && fg !== 231)).toBe(true);
    expect(nameCells(lit).every(({ fg }) => fg === 231)).toBe(true);
    expect(frameText(lit)).toMatch(/[♦♠]/);
  }
});

test("transitions reassemble the large mosaic letters within 0.6 seconds", () => {
  const early = renderAnsiFrame(1, "Héctor Magaña", 0, 96);
  const settled = renderAnsiFrame(1, "Héctor Magaña", 12, 96);
  const final = renderAnsiFrame(1, "Héctor Magaña", 168, 96);
  const letterCells = (frame: ReturnType<typeof renderAnsiFrame>) => frame.flat().filter((cell) => cell.char === "█").length;
  expect(letterCells(early)).toBeLessThan(letterCells(settled));
  expect(letterCells(final)).toBe(letterCells(settled));
});

test("dissolve mosaic background drifts without flashing a new pattern", () => {
  const background = (tick: number) => renderAnsiFrame(1, "Héctor Magaña", tick, 96)
    .slice(2, 7).flatMap((row) => row.slice(2, -2));
  for (let tick = 1; tick <= 20; tick += 1) {
    const previous = background(tick - 1);
    const current = background(tick);
    const changed = current.filter((cell, index) =>
      cell.char !== previous[index].char || cell.fg !== previous[index].fg || cell.bg !== previous[index].bg
    ).length;
    expect(changed).toBeGreaterThan(0);
    expect(changed).toBeLessThan(100);
  }
});

test("the full 40-character name fits at every grid width", () => {
  const longName = "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMN";
  for (const columns of [30, 56, 96]) {
    for (let style = 0; style < STYLE_NAMES.length; style += 1) {
      const frame = renderAnsiFrame(style, longName, 60, columns, true);
      frame.forEach((row) => expect(row).toHaveLength(columns));
      const exactText = frameText(frame).replace(/[^A-Z]/g, "");
      expect(exactText).toContain(longName);
    }
  }
  expect(renderAnsiFrame(3, "Héctor Magaña", 30, 96).flat().some((cell) => cell.bg !== 0)).toBe(true);
});

test("terminal serialization reproduces every browser grid with 256-color controls", () => {
  for (let style = 0; style < STYLE_NAMES.length; style += 1) {
    const frame = renderAnsiFrame(style, "Héctor Magaña", 20, 96);
    const ansi = serializeAnsiFrame(frame);
    expect(ansi.startsWith("\x1b[2J\x1b[H")).toBe(true);
    expect(ansi).toMatch(/\x1b\[38;5;\d+;48;5;\d+m/);
    expect(ansi.endsWith("\x1b[0m")).toBe(true);
    expect(ansi.replace(/\x1b\[[0-9;]*[A-Za-z]/g, "").replace(/\r\n/g, "\n")).toBe(frameText(frame));
  }
  expect(frameText(renderAnsiFrame(0, "Ada\x1b[31m", 0, 30))).not.toContain("\x1b");
});

test("previews a visitor name, validates empty input, and resets to the default", () => {
  render(<AsciiBanner />);
  const banner = screen.getByRole("region", { name: "Animated ANSI name banner" });
  mockBannerBounds(banner);

  fireEvent.click(screen.getByTestId("ansi-frame"), { clientY: 150 });
  const input = screen.getByRole("textbox", { name: "Name" });
  expect(input).toHaveFocus();
  expect(input).toHaveAttribute("maxLength", "40");
  fireEvent.change(input, { target: { value: "  Ada   Lovelace  " } });
  fireEvent.click(screen.getByRole("button", { name: "Preview" }));
  expect(screen.getByRole("heading", { name: "Ada Lovelace" })).toBeInTheDocument();
  expect(banner).toHaveFocus();

  fireEvent.click(banner, { clientY: 150 });
  fireEvent.change(screen.getByRole("textbox", { name: "Name" }), { target: { value: "   " } });
  fireEvent.click(screen.getByRole("button", { name: "Preview" }));
  expect(screen.getByRole("alert")).toHaveTextContent("Please enter a name.");
  expect(screen.getByRole("heading", { name: "Ada Lovelace" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Reset" }));
  expect(screen.getByRole("heading", { name: "Héctor Magaña" })).toBeInTheDocument();
});

test("traps dialog focus, closes on Escape, and discards an unsubmitted change", () => {
  render(<AsciiBanner />);
  const banner = screen.getByRole("region", { name: "Animated ANSI name banner" });
  mockBannerBounds(banner);
  toggleControls();
  fireEvent.click(banner, { clientY: 150 });
  const input = screen.getByRole("textbox", { name: "Name" });
  const firstButton = screen.getByRole("button", { name: "Close name dialog" });
  expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  firstButton.focus();
  fireEvent.keyDown(firstButton, { key: "Tab", shiftKey: true });
  expect(screen.getByRole("button", { name: "Reset" })).toHaveFocus();
  fireEvent.change(input, { target: { value: "Someone Else" } });
  fireEvent.keyDown(input, { key: "Escape" });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Héctor Magaña" })).toBeInTheDocument();
  expect(banner).toHaveFocus();
  expect(screen.getByRole("group", { name: "Animation style" })).toBeInTheDocument();
});

test("reduced motion keeps names static and disables automatic rotation", () => {
  mockMotionPreference(true);
  render(<AsciiBanner />);
  expect(screen.getByTestId("ansi-frame")).toHaveTextContent("Héctor Magaña");
  toggleControls();
  expect(screen.getByRole("button", { name: "Animation paused for reduced motion" })).toBeDisabled();
  act(() => jest.advanceTimersByTime(12000));
  expect(screen.getByRole("button", { name: "Chromatic frame" })).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(screen.getByRole("button", { name: "The Cosmos" }));
  expect(screen.getByTestId("ansi-frame")).toHaveTextContent("Héctor Magaña");
});
