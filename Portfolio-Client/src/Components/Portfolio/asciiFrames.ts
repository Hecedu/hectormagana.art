import { artName, blockGlyph } from "./ansiFont";

export const STYLE_NAMES = [
  "Chromatic frame",
  "Dissolve mosaic",
  "Clock sweep",
  "Prismatic wave",
  "Rising flames",
  "Gem Glow",
  "Matrix",
  "Snow Fall",
  "Autumn Leaves",
  "The Cosmos",
  "Space Invaders",
  "Pacman",
  "Thunder Storm",
  "Pendulum",
  "Mayan Ruins",
  "Candles in the dark",
  "Earth globe",
] as const;

export const PROFILE_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hecedu/" },
  { label: "GitHub", href: "https://github.com/Hecedu" },
  { label: "Resume", href: "https://docs.google.com/document/d/e/2PACX-1vRvf27qHY0aa3-MtCL6QHPSe5C0iK7vxqAEGT7xALxI_SNLoWf7LSVp_xulV3VpIB8JMiwzpg9ZpB0d/pub" },
] as const;

export type AnsiCell = { char: string; fg: number; bg: number; href?: string };
export type AnsiFrame = AnsiCell[][];

const PALETTES = [
  [196, 202, 220, 46, 51, 201],
  [201, 165, 93, 39, 51, 231],
  [220, 208, 201, 93, 51, 231],
  [21, 27, 33, 45, 51, 201],
  [88, 124, 160, 196, 202, 208, 214, 220, 226],
  [27, 33, 39, 45, 51, 129, 165, 201, 231],
  [22, 28, 34, 40, 46, 82, 118, 231],
  [24, 31, 38, 45, 117, 153, 159, 231],
  [88, 124, 160, 166, 172, 202, 208, 214, 220],
  [17, 18, 54, 93, 129, 165, 201, 51, 231],
  [21, 51, 46, 201, 226, 231],
  [226, 220, 39, 201, 196, 231],
  [17, 18, 24, 33, 45, 231],
  [24, 31, 38, 45, 159, 231],
  [28, 34, 40, 240, 244, 248, 252, 220],
  [52, 88, 124, 166, 208, 226, 231],
  [17, 18, 24, 31, 38, 45, 46, 231],
];

const BASE_COLORS = [
  "#000000", "#800000", "#008000", "#808000", "#000080", "#800080", "#008080", "#c0c0c0",
  "#808080", "#ff0000", "#00ff00", "#ffff00", "#0000ff", "#ff00ff", "#00ffff", "#ffffff",
];

export function ansiColor(index: number) {
  if (index < 16) return BASE_COLORS[index] || BASE_COLORS[0];
  if (index >= 232) {
    const value = (8 + (index - 232) * 10).toString(16).padStart(2, "0");
    return `#${value}${value}${value}`;
  }
  const cube = index - 16;
  const levels = [0, 95, 135, 175, 215, 255];
  const red = levels[Math.floor(cube / 36)];
  const green = levels[Math.floor(cube / 6) % 6];
  const blue = levels[cube % 6];
  return `#${[red, green, blue].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

export function frameText(frame: AnsiFrame) {
  return frame.map((row) => row.map((cell) => cell.char).join("")).join("\n");
}

export function cleanTerminalName(name: string) {
  return Array.from(name).map((char) => {
    const code = char.codePointAt(0) || 0;
    return code < 32 || (code >= 127 && code <= 159) ? " " : char;
  }).join("").replace(/\s+/g, " ").trim();
}

/** A complete frame, including screen-clear and an SGR reset, for a UTF-8 terminal. */
export function serializeAnsiFrame(frame: AnsiFrame) {
  let output = "\x1b[2J\x1b[H";
  let previousFg = -1;
  let previousBg = -1;
  frame.forEach((row, rowIndex) => {
    row.forEach(({ char, fg, bg }) => {
      if (fg !== previousFg || bg !== previousBg) {
        output += `\x1b[38;5;${fg};48;5;${bg}m`;
        previousFg = fg;
        previousBg = bg;
      }
      output += char;
    });
    if (rowIndex < frame.length - 1) output += "\r\n";
  });
  return output + "\x1b[0m";
}

function hash(x: number, y: number, seed: number) {
  let value = (x * 73856093) ^ (y * 19349663) ^ (seed * 83492791);
  value = Math.imul(value ^ (value >>> 13), 1274126177);
  return (value ^ (value >>> 16)) >>> 0;
}

// Each candle catches in turn; its part of the lettering brightens with it.
function candleLight(tick: number, candle: number) {
  return Math.max(0, Math.min(1, (tick - candle * 2) / 12));
}

function candleColor(light: number) {
  const shades = [0, 52, 88, 124, 160, 166, 202, 208, 214, 220, 226, 230, 231];
  return shades[Math.round(Math.max(0, Math.min(1, light)) * (shades.length - 1))];
}

function borderCell(scene: number, x: number, y: number, width: number, height: number, tick: number): AnsiCell {
  const palette = PALETTES[scene];
  const mod = (value: number, base: number) => ((value % base) + base) % base;
  const top = y === 0;
  const bottom = y === height - 1;
  const horizontal = top || bottom;
  const corner = (x === 0 || x === width - 1) && horizontal;
  const edge = top ? x : x === width - 1 ? width - 1 + y
    : bottom ? width + height - 2 + width - 1 - x : 2 * width + height - 3 + height - 1 - y;
  const perimeter = 2 * (width + height) - 4;
  const base = corner ? top ? x === 0 ? "╔" : "╗" : x === 0 ? "╚" : "╝" : horizontal ? "═" : "║";
  let char = base;
  let fg = palette[mod(edge, palette.length)];
  let bg = 0;

  switch (scene) {
    case 0: { // Chromatic ribbons chase clockwise around the whole frame.
      const ribbon = mod(edge - tick * 2, 25);
      fg = ribbon < 4 ? 231 : palette[mod(edge + Math.floor(tick / 2), palette.length)];
      if (!corner && ribbon < 4) char = ribbon < 2 ? "▓" : "░";
      break;
    }
    case 1: { // Mosaic fragments dissolve and reassemble in small clusters.
      const cluster = hash(Math.floor(edge / 3), Math.floor(tick / 3), 1) % 9;
      fg = palette[mod(Math.floor(edge / 3) + Math.floor(tick / 3), palette.length)];
      if (!corner && cluster < 5) char = cluster < 2 ? "▓" : cluster < 4 ? "▒" : "░";
      if (cluster === 0) bg = 53;
      break;
    }
    case 2: { // A radial clock hand sweeps the same direction as the scene.
      const angle = mod(Math.atan2(x - (width - 1) / 2, (height - 1) / 2 - y), Math.PI * 2);
      const trail = mod(tick * 0.15 - angle, Math.PI * 2);
      fg = trail < 0.2 ? 231 : trail < 0.75 ? 226 : trail < 1.8 ? 201 : 93;
      if (!corner && trail < 0.2) char = "▓";
      break;
    }
    case 3: { // The prismatic wave bends through both axes.
      const wave = Math.sin(Math.abs(x - width / 2) * 0.5 + y * 0.75 - tick * 0.8);
      fg = wave > 0.7 ? 231 : palette[mod(Math.floor((wave + 1) * 3) + Math.floor(tick / 5), palette.length)];
      if (!corner && wave > 0.7) char = "▒";
      bg = wave > 0.85 ? 18 : 0;
      break;
    }
    case 4: { // Heat rises along the sides, with embers at the top.
      const rise = height - 1 - y;
      const flame = Math.sin(x * 0.31 + tick * 0.15) ** 8 * 7 + Math.sin(x * 0.72 - tick * 0.19) ** 10 * 4;
      const ember = mod(x + tick, 13) < 2;
      fg = top ? ember ? 226 : 208 : rise < flame + 2 ? rise < 3 ? 226 : 202 : 124;
      if (!corner && ((top && ember) || (!top && rise < flame + 2))) char = top ? "*" : rise < 3 ? "▓" : "░";
      bg = bottom ? 52 : 0;
      break;
    }
    case 5: { // Faceted gems pulse and catch moving glints.
      const facet = mod(edge, 11);
      const glint = mod(tick + edge * 2, 17) < 3;
      fg = glint ? 231 : palette[mod(Math.floor(edge / 11), palette.length)];
      if (!corner && (facet === 0 || facet === 1 || glint)) char = facet === 0 ? "◆" : "◇";
      break;
    }
    case 6: { // Matrix code streams downward on the vertical rails.
      const column = x === 0 ? 0 : x === width - 1 ? 1 : Math.floor(x / 2);
      const scan = mod(y - Math.floor(tick * (0.55 + column % 3 * 0.12)), 10);
      fg = scan === 0 ? 82 : scan < 3 ? 118 : scan < 7 ? 46 : 28;
      if (!corner && (!horizontal || mod(x - tick, 9) < 3)) char = scan === 0 ? "█" : hash(edge, Math.floor(tick / 3), 6) % 2 ? "1" : "0";
      break;
    }
    case 7: { // Snow falls down the sides and collects on the bottom rail.
      const flake = mod(y - Math.floor(tick * 0.32) + hash(x, 0, 7), 9);
      fg = bottom ? 153 : flake === 0 ? 231 : flake < 3 ? 159 : 153;
      if (!corner && bottom) char = mod(x, 7) < 3 ? "▄" : "░";
      else if (!corner && flake === 0) char = "✳";
      break;
    }
    case 8: { // Leaves tumble down the sides into an autumn floor.
      const fall = mod(y - Math.floor(tick * 0.25) + hash(x, 0, 8), 12);
      fg = palette[mod(Math.floor(edge / 4) + Math.floor(tick / 4), palette.length)];
      if (!corner && bottom) char = mod(x + Math.floor(tick / 6), 5) === 0 ? "◆" : "▄";
      else if (!corner && fall < 2) char = ["◆", "╱", "◇", "╲"][mod(Math.floor(tick / 4) + edge, 4)];
      break;
    }
    case 9: { // Stars orbit the perimeter and flare as they pass.
      const orbit = mod(edge - tick * 1.4, perimeter);
      const star = mod(orbit, 23);
      fg = star < 2 ? 231 : star < 6 ? 201 : 54;
      if (!corner && star < 6) char = star < 2 ? "✦" : star < 4 ? "+" : "·";
      break;
    }
    case 10: { // Invader formation marches while lasers cross the rails.
      const march = Math.round(Math.sin(tick * 0.1) * 2);
      const formation = mod(x + march, 12);
      const laser = mod(y - Math.floor(tick * 0.65), 11) < 2;
      const invader = top && formation < 4;
      const ship = bottom && mod(x - Math.round(Math.sin(tick * 0.07) * 5), 13) < 3;
      fg = invader || ship || (laser && !horizontal) ? 231 : formation < 4 ? 46 : 51;
      if (!corner && top && formation < 4) char = formation === 1 ? "▲" : "▄";
      else if (!corner && !horizontal && laser) char = "│";
      else if (!corner && ship) char = "▄";
      break;
    }
    case 11: { // A lit trail travels around the dotted frame.
      const chase = mod(edge - Math.floor(tick * 0.6), perimeter);
      fg = chase < 4 ? 220 : 226;
      if (!corner && mod(edge, 5) === 0) char = "·";
      break;
    }
    case 12: { // Rain runs down the sides; the thunder flash lights everything.
      const flash = mod(tick, 43) < 5;
      const rain = mod(y - Math.floor(tick * 0.7) + hash(x, 0, 12), 7);
      fg = flash ? 231 : rain < 2 ? 159 : 33;
      if (!corner && !horizontal && rain < 2) char = rain === 0 ? "╱" : "│";
      else if (!corner && top && mod(x + Math.floor(tick / 3), 17) < 2) char = flash ? "╱" : "▓";
      break;
    }
    case 13: { // Fixed pivots and moving floor reflections frame the swinging bobs.
      const count = width < 56 ? 2 : 3;
      const pivots = Array.from({ length: count }, (_, index) => Math.round((index + 0.5) * width / count));
      const pivotDistance = Math.min(...pivots.map((pivot) => Math.abs(x - pivot)));
      const reflections = pivots.map((pivot, index) =>
        pivot + Math.sin(tick * 0.065 + index * 1.8) * width / (count * 2.5));
      const reflectionDistance = Math.min(...reflections.map((reflection) => Math.abs(x - reflection)));
      const distance = top ? pivotDistance : reflectionDistance;
      fg = distance < 2 ? 231 : distance < 6 ? 159 : 31;
      if (!corner && top && pivotDistance < 1) char = "┬";
      else if (!corner && bottom && reflectionDistance < 1) char = "·";
      else if (!corner && !horizontal && mod(y + Math.round(tick * 0.2), 8) === 0) char = "·";
      break;
    }
    case 14: { // Stone rails meet a grassy base, with gold sunlight passing over them.
      const sun = mod(x + y - tick * 0.4, 21);
      const rail = bottom || (!horizontal && y > height * 0.7)
        ? [28, 34, 40] : [240, 244, 248, 252];
      fg = sun < 3 ? 220 : rail[mod(Math.floor(edge / 5), rail.length)];
      if (!corner && mod(edge, 6) === 0) char = sun < 3 ? "◆" : "▦";
      else if (!corner && sun < 3) char = "▓";
      break;
    }
    case 15: { // The border brightens as the candles are lit.
      const candle = Math.min(width < 56 ? 1 : 3, Math.floor(edge / perimeter * (width < 56 ? 2 : 4)));
      const light = candleLight(tick, candle);
      const glow = Math.sin(tick * 0.22 + Math.floor(edge / 12) * 2.7);
      fg = light === 0 ? 236 : candleColor(light * (glow > 0.5 ? 1 : 0.8));
      if (light > 0 && !corner && mod(edge, 12) === 0) char = glow > 0 ? "♦" : "♠";
      else if (light > 0.6 && !corner && glow > 0.7 && mod(edge, 4) === 0) char = "·";
      break;
    }
    case 16: { // Rotating land and sea bands circle the globe.
      const longitude = edge * 0.13 + tick * 0.045;
      const land = Math.sin(longitude + y * 0.45) > 0.35;
      const meridian = Math.abs(Math.sin(longitude * 5)) < 0.13;
      fg = meridian ? 231 : land ? 46 : palette[mod(Math.floor(edge / 5) + Math.floor(tick / 5), palette.length)];
      if (!corner && meridian) char = "◌";
      else if (!corner && land) char = "▓";
      break;
    }
  }
  return { char, fg, bg };
}

function wrapArtName(text: string, maxChars: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    if (!word) continue;
    if (line && line.length + word.length + 1 > maxChars) {
      lines.push(line);
      line = "";
    }
    if (word.length > maxChars) {
      if (line) lines.push(line);
      for (let offset = 0; offset < word.length; offset += maxChars) {
        const part = word.slice(offset, offset + maxChars);
        if (part.length === maxChars) lines.push(part);
        else line = part;
      }
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : ["?"];
}

function exactNameLines(name: string, maxChars: number) {
  const chars = Array.from(name);
  const lines: string[] = [];
  for (let offset = 0; offset < chars.length; offset += maxChars) {
    lines.push(chars.slice(offset, offset + maxChars).join(""));
  }
  return lines;
}

export function renderAnsiFrame(style: number, name: string, tick: number, columns: number, still = false): AnsiFrame {
  const safeName = cleanTerminalName(name) || "?";
  const width = Math.max(30, Math.min(100, Math.floor(columns)));
  const scene = Math.max(0, Math.min(STYLE_NAMES.length - 1, style));
  const palette = PALETTES[scene];
  const fontWidth: 3 | 5 = scene === 11 || safeName.length > 20 || width < 60 ? 3 : 5;
  const fontHeight: 3 | 5 | 7 = safeName.length > 20 ? 3 : width < 60 ? 5 : 7;
  const maxChars = Math.floor((width - 5) / (fontWidth + 1));
  const artworkName = artName(safeName);
  const lines = wrapArtName(artworkName, maxChars);
  const exactLines = exactNameLines(safeName, width - 4);
  const artHeight = lines.length * (fontHeight + 1) - 1;
  const artTop = width >= 90 ? 8 : width >= 56 ? 5 : 4;
  // Reserve the tallest lettering and scene so rotating styles never shifts the page below the banner.
  const narrowestFontWidth = safeName.length > 20 || width < 60 ? 3 : 5;
  const reservedLines = wrapArtName(artworkName, Math.floor((width - 5) / (narrowestFontWidth + 1)));
  const reservedArtHeight = reservedLines.length * (fontHeight + 1) - 1;
  const height = Math.max(width >= 90 ? 26 : width >= 56 ? 25 : 24,
    artTop + reservedArtHeight + 11 + exactLines.length + 3);
  // Keep the name and links in the same compact footer for every scene.
  const exactTop = height - exactLines.length - 3;
  const frame: AnsiFrame = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({ char: " ", fg: 7, bg: 0 }))
  );
  const mask: boolean[][] = Array.from({ length: height }, () => Array<boolean>(width).fill(false));
  const points: { x: number; y: number }[] = [];
  const mod = (value: number, base: number) => ((value % base) + base) % base;
  const motionTick = still ? 60 : Math.max(0, tick);
  const cycle = motionTick % 180;
  const edgeTicks = Math.min(cycle, 179 - cycle);
  const fragment = still ? 0 : 1 - Math.min(1, edgeTicks / 11);
  const centerX = (width - 1) / 2;
  const centerY = artTop + (artHeight - 1) / 2;
  const stageTop = 2;
  const stageBottom = exactTop - 2;
  const stageCenterY = (stageTop + stageBottom) / 2;
  const stageRadiusY = (stageBottom - stageTop) / 2;
  const sweep = mod(motionTick * 0.15, Math.PI * 2);
  const paint = (x: number, y: number, char: string, fg: number, bg = 0, href?: string) => {
    if (x > 0 && x < width - 1 && y > 0 && y < height - 1) frame[y][x] = { char, fg, bg, href };
  };
  const besideLetter = (x: number, y: number) => {
    for (let dy = -1; dy <= 1; dy += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        if (mask[y + dy]?.[x + dx]) return true;
      }
    }
    return false;
  };
  const polar = (x: number, y: number) => {
    const dx = x - centerX;
    const fullStage = scene === 2 || scene === 9;
    const dy = y - (fullStage ? stageCenterY : centerY);
    const radius = Math.sqrt((dx / (width * 0.44)) ** 2 + (dy / Math.max(5, fullStage ? stageRadiusY : artHeight * 0.85)) ** 2);
    const angle = mod(Math.atan2(dx, -dy), Math.PI * 2);
    return { radius, angle, trail: mod(sweep - angle, Math.PI * 2) };
  };
  const paintBehind = (x: number, y: number, char: string, fg: number, bg = 0) => {
    if (!besideLetter(x, y) && y < exactTop - 1) paint(x, y, char, fg, bg);
  };
  const sprite = (x: number, y: number, rows: string[], fg: number) => {
    rows.forEach((row, dy) => Array.from(row).forEach((char, dx) => {
      if (char !== " ") paintBehind(x + dx, y + dy, char, fg);
    }));
  };

  lines.forEach((line, lineIndex) => {
    const glyphWidth = line.length * (fontWidth + 1) - 1;
    const startX = Math.floor((width - glyphWidth) / 2);
    const startY = artTop + lineIndex * (fontHeight + 1);
    Array.from(line).forEach((character, charIndex) => {
      blockGlyph(character, fontWidth, fontHeight).forEach((pixels, row) => pixels.forEach((on, column) => {
        if (!on) return;
        const x = startX + charIndex * (fontWidth + 1) + column;
        const y = startY + row;
        mask[y][x] = true;
        points.push({ x, y });
      }));
    });
  });

  // Background, lettering, and border all use terminal cells, so ANSI output
  // contains the exact same frame as the browser.
  if (scene === 0) {
    for (let y = 2; y < exactTop - 1; y += 1) {
      for (let x = 2; x < width - 2; x += 1) {
        if (besideLetter(x, y)) continue;
        const ribbon = mod(x + y * 2 - motionTick * 2, 25);
        if (ribbon < 4) paint(x, y, ribbon < 2 ? "▓" : "░", palette[mod(x + motionTick, palette.length)]);
      }
    }
  } else if (scene === 1) {
    for (let y = 2; y < exactTop - 1; y += 1) {
      for (let x = 2; x < width - 2; x += 1) {
        const seed = hash(x, y, 1);
        const cluster = seed % 17;
        if (cluster >= 4) continue;
        // Keep fragments tied to their original cells. Staggered, slow steps
        // make them drift without replacing the whole pattern every few ticks.
        const driftX = Math.floor(motionTick * (0.08 + ((seed >>> 5) % 4) * 0.03) + ((seed >>> 9) % 16) / 16);
        const driftY = Math.floor(motionTick * (0.03 + ((seed >>> 13) % 3) * 0.02) + ((seed >>> 17) % 16) / 16);
        const outputX = 2 + mod(x - 2 + driftX, width - 4);
        const outputY = 2 + mod(y - 2 + driftY, exactTop - 3);
        if (besideLetter(outputX, outputY)) continue;
        paint(outputX, outputY, cluster === 0 ? "▓" : cluster < 3 ? "▒" : "░", palette[seed % palette.length], cluster === 0 ? 53 : 0);
      }
    }
  } else if (scene === 2) {
    for (let y = 2; y < exactTop - 1; y += 1) {
      for (let x = 2; x < width - 2; x += 1) {
        if (besideLetter(x, y)) continue;
        const { radius, trail } = polar(x, y);
        if (trail < 0.19 && radius < 1.1) paint(x, y, "▓", 226);
        else if (radius > 0.82 && radius < 1.08) {
          paint(x, y, trail < 0.65 ? "▓" : trail < 1.8 ? "▒" : "░", trail < 0.65 ? 226 : trail < 1.8 ? 201 : 93);
        } else if (mod(radius * 18 - motionTick * 0.35, 9) < 0.8 && radius < 1.12) {
          paint(x, y, "·", 51);
        }
      }
    }
  } else if (scene === 3) {
    for (let y = 2; y < exactTop - 1; y += 1) {
      for (let x = 2; x < width - 2; x += 1) {
        if (besideLetter(x, y)) continue;
        const distance = Math.abs(x - centerX);
        const band = mod(distance * 0.5 + y * 0.75 - motionTick * 0.8, 18);
        if (band < 5) paint(x, y, band < 2 ? "▓" : "▒", palette[mod(Math.floor(distance / 4) + motionTick, palette.length)], band < 2 ? 18 : 17);
      }
    }
  } else if (scene === 4) {
    const emberCount = Math.floor(width / 7);
    for (let y = 2; y < exactTop - 1; y += 1) {
      for (let x = 2; x < width - 2; x += 1) {
        if (mask[y][x] || (y < artTop + artHeight - 2 && besideLetter(x, y))) continue;
        const rise = exactTop - 2 - y;
        const edgeBoost = width < 60 && (x < 8 || x > width - 9) ? 3 : 0;
        const tongue = 1.5 + edgeBoost
          + 6 * Math.sin(x * 0.31 + motionTick * 0.15) ** 8
          + 4 * Math.sin(x * 0.72 - motionTick * 0.19) ** 10
          + hash(Math.floor(x / 2), 0, Math.floor(motionTick / 3)) % 3;
        const flicker = hash(x, y, Math.floor(motionTick / 2)) % 11;
        if (rise < tongue && flicker > (rise < 2 ? 2 : 1)) {
          const heat = rise < 2 ? 7 : rise < 4 ? 6 : rise < 7 ? 5 : 4;
          paint(x, y, rise < 2 ? "▓" : rise < tongue - 2 ? "▒" : "░", palette[heat], rise < 2 ? 52 : 0);
        }
      }
    }
    for (let ember = 0; ember < emberCount; ember += 1) {
      const x = 2 + hash(ember, 0, 11) % (width - 4);
      const travel = mod(Math.floor(motionTick * 0.7) + hash(ember, 1, 12), Math.max(8, exactTop - 3));
      const y = exactTop - 2 - travel;
      if (y > 1 && !besideLetter(x, y)) paint(x, y, travel % 3 === 0 ? "*" : "·", 214);
    }
  } else if (scene === 5) {
    const stageRows = stageBottom - stageTop + 1;
    const sparkles = Math.max(stageRows, Math.floor(width / 2));
    for (let sparkle = 0; sparkle < sparkles; sparkle += 1) {
      const x = 2 + hash(sparkle, 0, 5) % (width - 4);
      const y = stageTop + mod(sparkle * 7 + Math.floor(motionTick * 0.08), stageRows);
      if (!besideLetter(x, y)) paint(x, y, sparkle % 7 === 0 ? "◇" : "·", palette[sparkle % palette.length]);
    }
    const gems = Math.max(3, Math.floor(width / 17));
    for (let gem = 0; gem < gems; gem += 1) {
      const cx = Math.round((gem + 0.5) * width / gems);
      const cy = gem % 2 === 0 ? stageTop + 4 : stageBottom - 2;
      const radius = 3 + Math.round((1 + Math.sin(motionTick * 0.16 + gem * 1.7)) * 0.9);
      for (let dy = -radius; dy <= radius; dy += 1) {
        for (let dx = -radius; dx <= radius; dx += 1) {
          const x = cx + dx;
          const y = cy + dy;
          const facet = Math.abs(dx) + Math.abs(dy) * 1.5;
          if (x < 2 || x >= width - 2 || y < 2 || y >= exactTop - 1 || facet > radius || besideLetter(x, y)) continue;
          const glint = mod(motionTick + gem * 7 + dx * 2 - dy, 15) < 3;
          paint(x, y, facet < 1 ? "◆" : glint ? "◇" : facet > radius - 1 ? "·" : "░", glint ? 231 : palette[mod(gem + Math.floor(facet), palette.length)]);
        }
      }
    }
  } else if (scene === 6) {
    for (let x = 2; x < width - 2; x += 2) {
      const speed = 1 + (hash(x, 0, 6) % 3) * 0.45;
      const head = mod(Math.floor(motionTick * speed * 0.55) + hash(x, 1, 6), exactTop + 8) - 4;
      for (let trail = 0; trail < 9; trail += 1) {
        const y = head - trail;
        if (y < 2 || y >= exactTop - 1 || besideLetter(x, y)) continue;
        const glyph = trail === 0 ? "█" : ["0", "1", "┊", "¦"][hash(x, y, Math.floor(motionTick / 3)) % 4];
        paint(x, y, glyph, trail === 0 ? 231 : trail < 3 ? 118 : trail < 6 ? 46 : 28);
      }
    }
  } else if (scene === 7) {
    const flakes = Math.floor(width * 1.8);
    for (let flake = 0; flake < flakes; flake += 1) {
      const speed = 0.18 + (hash(flake, 0, 7) % 4) * 0.08;
      const y = 2 + mod(Math.floor(motionTick * speed) + hash(flake, 1, 7), Math.max(5, exactTop - 3));
      const drift = Math.sin(motionTick * 0.09 + flake * 1.9) * 2;
      const x = 2 + mod(Math.round(hash(flake, 2, 7) + drift + motionTick * speed * 0.3), width - 4);
      if (y < exactTop - 1 && !besideLetter(x, y)) paint(x, y, flake % 5 === 0 ? "✳" : flake % 3 === 0 ? "*" : "·", flake % 5 === 0 ? 231 : flake % 3 === 0 ? 159 : 153);
    }
    const mountainBase = exactTop - 2;
    const peaks = [
      { x: width * 0.18, height: 3 },
      { x: width * 0.51, height: 5 },
      { x: width * 0.83, height: 4 },
    ];
    const slopeWidth = Math.max(2, width / 22);
    for (let x = 2; x < width - 2; x += 1) {
      const peak = peaks.reduce((highest, candidate) =>
        candidate.height - Math.abs(x - candidate.x) / slopeWidth > highest.height - Math.abs(x - highest.x) / slopeWidth
          ? candidate : highest
      );
      const rise = Math.max(0, peak.height - Math.abs(x - peak.x) / slopeWidth);
      const ridgeY = mountainBase - Math.floor(rise);
      for (let y = ridgeY; y <= mountainBase; y += 1) {
        if (y === ridgeY && rise >= 1) {
          paint(x, y, Math.abs(x - peak.x) < 1 ? "▲" : x < peak.x ? "╱" : "╲", 231);
        } else {
          paint(x, y, "▓", y - ridgeY < 2 ? 117 : 38);
        }
      }
    }
  } else if (scene === 8) {
    const leaves = Math.floor(width * 0.9);
    for (let leaf = 0; leaf < leaves; leaf += 1) {
      const speed = 0.16 + (hash(leaf, 0, 8) % 4) * 0.07;
      const fall = motionTick * speed + hash(leaf, 1, 8);
      const y = 2 + mod(Math.floor(fall), Math.max(5, exactTop - 3));
      const swirl = Math.sin(motionTick * 0.12 + leaf * 1.7) * 3;
      const x = 2 + mod(Math.round(hash(leaf, 2, 8) + swirl + fall * 0.4), width - 4);
      if (y < exactTop - 1 && !besideLetter(x, y)) {
        const turn = mod(Math.floor(motionTick / 4) + leaf, 4);
        const color = palette[4 + hash(leaf, 3, 8) % 5];
        paint(x, y, ["◆", "╱", "◇", "╲"][turn], color);
        if (width >= 56 && turn % 2 === 0 && !besideLetter(x + 1, y)) paint(x + 1, y, turn === 0 ? "╲" : "╱", palette[2]);
      }
    }
    for (let x = 2; x < width - 2; x += 1) {
      if (hash(x, 0, Math.floor(motionTick / 6)) % 4 !== 0) paint(x, exactTop - 2, "▄", palette[hash(x, 1, 8) % palette.length]);
    }
  } else if (scene === 9) {
    for (let y = 2; y < exactTop - 1; y += 1) {
      for (let x = 2; x < width - 2; x += 1) {
        if (besideLetter(x, y)) continue;
        const { radius } = polar(x, y);
        if (radius < 1.15 && mod(radius * 18 - motionTick * 0.45, 9) < 1.4) paint(x, y, "░", radius < 0.75 ? 54 : 93);
      }
    }
    const stars = Math.floor(width * 1.2);
    for (let star = 0; star < stars; star += 1) {
      const angle = (hash(star, 0, 9) % 628) / 100;
      const speed = 0.005 + (hash(star, 1, 9) % 5) * 0.002;
      const depth = mod(hash(star, 2, 9) / 1000 + motionTick * speed, 1.1);
      const x = Math.round(centerX + Math.sin(angle) * depth * width * 0.45);
      const y = Math.round(stageCenterY - Math.cos(angle) * depth * Math.max(7, stageRadiusY * 0.95));
      if (x < 2 || x >= width - 2 || y < 2 || y >= exactTop - 1 || besideLetter(x, y)) continue;
      paint(x, y, depth > 0.7 ? (star % 4 === 0 ? "✦" : "*") : depth > 0.35 ? "+" : "·", depth > 0.7 ? 231 : depth > 0.35 ? 201 : 93);
    }
  } else if (scene === 10) {
    // The fleet rocks from side to side while its lasers cross the player's return fire.
    const march = Math.round(Math.sin(motionTick * 0.1) * 2);
    const fleet = width < 56 ? 2 : Math.floor(width / 16);
    const enemies = Array.from({ length: fleet }, (_, alien) => {
      const x = Math.round((alien + 0.5) * width / fleet) - 2 + march;
      const y = width < 56 || alien % 2 === 1 ? exactTop - 8 : 2;
      return { x, y, alien };
    });
    enemies.forEach(({ x, alien }) => {
      const shotY = 2 + mod(Math.floor(motionTick * 0.65) + alien * 7, Math.max(4, exactTop - 3));
      paintBehind(x + 2, shotY, shotY % 2 ? "│" : "╵", alien % 2 ? 196 : 226);
    });
    const shipX = Math.round(centerX + Math.sin(motionTick * 0.07) * width * 0.27);
    for (let trail = 0; trail < 5; trail += 1) {
      const y = exactTop - 6 - mod(Math.floor(motionTick * 0.9), Math.max(5, exactTop - 5)) - trail;
      paintBehind(shipX, y, trail === 0 ? "↑" : "│", trail === 0 ? 231 : 51);
    }
    enemies.forEach(({ x, y, alien }) => {
      sprite(x, y, mod(Math.floor(motionTick / 6) + alien, 2) === 0
        ? [" ▄█▄ ", "█████", "█ █ █"] : [" ▄█▄ ", "█████", " █ █ "], 231);
    });
    sprite(shipX - 2, exactTop - 4, ["  ▲  ", "▄███▄"], 231);
  } else if (scene === 11) {
    // A blue maze surrounds the name; yellow pellets stay outside its walls.
    const artWidth = Math.max(...lines.map((line) => line.length * (fontWidth + 1) - 1));
    const mazeLeft = Math.max(1, Math.floor((width - artWidth) / 2) - 3);
    const mazeRight = width - 1 - mazeLeft;
    const mazeTop = Math.max(2, artTop - 3);
    const mazeBottom = artTop + artHeight + 3;
    for (let x = mazeLeft; x <= mazeRight; x += 1) {
      paint(x, mazeTop, x === mazeLeft ? "╔" : x === mazeRight ? "╗" : "═", 27);
      paint(x, mazeBottom, x === mazeLeft ? "╚" : x === mazeRight ? "╝" : "═", 27);
    }
    for (let y = mazeTop + 1; y < mazeBottom; y += 1) {
      paint(mazeLeft, y, "║", 27);
      paint(mazeRight, y, "║", 27);
    }
    const dividerStep = Math.max(5, Math.floor((mazeRight - mazeLeft) / 4));
    for (let x = mazeLeft + dividerStep; x < mazeRight; x += dividerStep) {
      paint(x, mazeTop + 1, "║", 27);
      paint(x, mazeBottom - 1, "║", 27);
    }
    if (mazeTop > 1) {
      for (let x = 4; x < width - 4; x += Math.max(8, Math.floor(width / 7))) {
        paint(x, mazeTop - 1, "●", 226);
      }
    }
    const sideXs = [Math.floor(mazeLeft / 2), Math.ceil((mazeRight + width - 1) / 2)];
    for (const x of sideXs) {
      if (x < 2 || x >= width - 2) continue;
      for (let y = mazeTop + 2; y < mazeBottom; y += 4) paint(x, y, "●", 226);
    }
    for (let x = 2; x < width - 2; x += 1) {
      paint(x, exactTop - 2, x % 13 === 0 ? "╦" : "═", 27);
    }
    const runTicks = 80;
    const run = Math.floor(motionTick / runTicks);
    // The pair starts wholly outside the left edge and finishes wholly outside
    // the right edge before its next run begins in the reversed order.
    const left = -14 + Math.round((motionTick % runTicks) * (width + 14) / (runTicks - 1));
    const ghostLeads = run % 2 === 0;
    const pacX = left + (ghostLeads ? 0 : 8);
    const ghostX = left + (ghostLeads ? 8 : 0);
    const laneY = exactTop - 7;
    const mouth = mod(Math.floor(motionTick / 3), 3);
    const pacRows = mouth === 0
      ? [" ▄██▄ ", "█████ ", "██    ", "█████ ", " ▀██▀ "]
      : mouth === 1
        ? [" ▄██▄ ", "██████", "████  ", "██████", " ▀██▀ "]
        : [" ▄██▄ ", "██████", "██████", "██████", " ▀██▀ "];
    sprite(pacX, laneY, pacRows, 226);
    paintBehind(pacX + 3, laneY + 1, "●", 0, 226);
    const ghostColor = ghostLeads ? 21 : 39;
    sprite(ghostX, laneY, [" ▄██▄ ", "██████", "██████", "██████", "▀ ▀ ▀"], ghostColor);
    paintBehind(ghostX + 2, laneY + 2, "◉", 231, ghostColor);
    paintBehind(ghostX + 3, laneY + 2, "◉", 231, ghostColor);
  } else if (scene === 12) {
    const flash = mod(motionTick, 43) < 5;
    for (let x = 2; x < width - 2; x += 1) {
      const cloud = 2 + Math.round(1.1 * Math.sin(x * 0.19 + motionTick * 0.025) + Math.sin(x * 0.41));
      for (let y = 2; y <= cloud + 1; y += 1) paintBehind(x, y, y === cloud + 1 ? "▄" : "▓", flash ? 231 : y === 2 ? 24 : 33);
    }
    for (let drop = 0; drop < width * 1.4; drop += 1) {
      const x = 2 + mod(hash(drop, 0, 12) - Math.floor(motionTick * 0.4), width - 4);
      const y = 4 + mod(hash(drop, 1, 12) + Math.floor(motionTick * (0.55 + drop % 3 * 0.18)), Math.max(5, exactTop - 5));
      paintBehind(x, y, drop % 4 === 0 ? "╱" : "│", drop % 4 === 0 ? 159 : 45);
    }
    if (flash) {
      const boltX = Math.round(width * (0.25 + (hash(Math.floor(motionTick / 43), 0, 12) % 50) / 100));
      for (let step = 0; step < exactTop - 5; step += 1) {
        paintBehind(boltX + (step % 4 < 2 ? 0 : 1), 3 + step, step % 2 ? "╲" : "╱", 226);
      }
    }
  } else if (scene === 13) {
    const count = width < 56 ? 2 : 3;
    for (let pendulum = 0; pendulum < count; pendulum += 1) {
      const pivotX = Math.round((pendulum + 0.5) * width / count);
      const pivotY = 2;
      const length = Math.max(5, exactTop - 6);
      const phase = motionTick * 0.065 + pendulum * 1.8;
      const reach = Math.min(width / (count * 2.5), length * 0.65);
      const maxAngle = Math.asin(reach / length);
      const angle = maxAngle * Math.sin(phase);
      const bobX = pivotX + Math.round(length * Math.sin(angle));
      const bobY = pivotY + Math.round(length * Math.cos(angle));
      paintBehind(pivotX, pivotY, "┬", 159);
      for (let y = pivotY + 1; y < bobY; y += 1) {
        const x = Math.round(pivotX + (bobX - pivotX) * (y - pivotY) / (bobY - pivotY));
        paintBehind(x, y, bobX < pivotX ? "╱" : bobX > pivotX ? "╲" : "│", 45);
      }
      for (let echo = 1; echo <= 3; echo += 1) {
        const oldAngle = maxAngle * Math.sin(phase - echo * 0.13);
        const oldX = pivotX + Math.round(length * Math.sin(oldAngle));
        const oldY = pivotY + Math.round(length * Math.cos(oldAngle));
        paintBehind(oldX, oldY + 2, "·", 31);
      }
      sprite(bobX - 1, bobY - 1, [" ◯ ", "◉◉◉", " ◯ "], pendulum % 2 ? 231 : 159);
    }
  } else if (scene === 14) {
    const ground = exactTop - 2;
    for (let x = 2; x < width - 2; x += 1) {
      paintBehind(x, ground, x % 3 === 0 ? "▒" : "▄", x % 5 === 0 ? 40 : x % 3 === 0 ? 28 : 34);
    }
    const temples = width < 56 ? [Math.round(centerX)] : [Math.round(width * 0.23), Math.round(width * 0.76)];
    temples.forEach((cx, index) => {
      const levels = width < 56 ? 3 : 5;
      for (let level = 0; level < levels; level += 1) {
        const y = ground - level;
        const half = levels + 3 - level * 2;
        for (let x = cx - half; x <= cx + half; x += 1) {
          const edge = x === cx - half || x === cx + half;
          paintBehind(x, y, edge ? "▟" : (x + level) % 3 ? "▓" : "▦", edge ? 252 : (x + level) % 3 === 0 ? 240 : level % 2 ? 248 : 244);
        }
      }
      paintBehind(cx, ground - levels, "◆", 220);
      const torchX = cx + (index % 2 ? -levels - 3 : levels + 3);
      paintBehind(torchX, ground - 2, "╥", 248);
      paintBehind(torchX, ground - 3, mod(motionTick + index * 7, 6) < 3 ? "♠" : "♦", 220);
    });
    for (let x = 3; x < width - 3; x += 7) {
      const glint = mod(motionTick + x, 23) < 4;
      paintBehind(x, 2 + hash(x, 0, 14) % 3, glint ? "✦" : "·", glint ? 220 : 248);
    }
  } else if (scene === 15) {
    const candles = width < 56 ? 2 : 4;
    for (let candle = 0; candle < candles; candle += 1) {
      const cx = Math.round((candle + 0.5) * width / candles);
      const base = exactTop - 2;
      const top = base - 3 - candle % 3;
      const flicker = Math.sin(motionTick * 0.22 + candle * 2.7);
      const light = candleLight(motionTick, candle);
      if (light > 0) {
        for (let dy = -3; dy <= 3; dy += 1) {
          for (let dx = -6; dx <= 6; dx += 1) {
            if (Math.abs(dx) + Math.abs(dy) * 1.7 < 6) {
              paintBehind(cx + dx, top - 1 + dy, "·", candleColor(light * (Math.abs(dx) < 3 ? 0.45 : 0.25)));
            }
          }
        }
      }
      for (let y = top; y <= base; y += 1) sprite(cx - 1, y, ["▐█▌"], light > 0 ? y === top ? 231 : 250 : 242);
      paintBehind(cx, top - 1, "│", light > 0 ? 94 : 238);
      if (light > 0) {
        paintBehind(cx + Math.round(flicker), top - 2, "♦", candleColor(light * (flicker > 0 ? 1 : 0.85)));
        paintBehind(cx + Math.round(flicker * 2), top - 3, flicker > 0.3 ? "·" : "♠", candleColor(light * 0.8));
      }
      for (let x = cx - 3; x <= cx + 3; x += 1) paintBehind(x, base + 1, "▄", light > 0 ? 94 : 238);
    }
  } else if (scene === 16) {
    const rx = width < 56 ? 10 : Math.min(width * 0.35, 24);
    const ry = width < 56 ? 3.5 : Math.min((exactTop - 4) * 0.52, 9);
    const globeY = width < 56 ? exactTop - 5 : Math.round((exactTop - 1) / 2);
    const rotation = motionTick * 0.035;
    for (let y = 2; y < exactTop - 1; y += 1) {
      for (let x = 2; x < width - 2; x += 1) {
        const nx = (x - centerX) / rx;
        const ny = (y - globeY) / ry;
        const distance = nx * nx + ny * ny;
        if (distance > 1.05) {
          if (hash(x, y, 16) % 53 === 0) paintBehind(x, y, "·", 31);
          continue;
        }
        const rim = distance > 0.88;
        const longitude = Math.asin(Math.max(-1, Math.min(1, nx))) + rotation;
        const latitude = Math.asin(Math.max(-1, Math.min(1, ny)));
        const meridian = Math.abs(Math.sin(longitude * 5)) < 0.13;
        const parallel = Math.abs(Math.sin(latitude * 6)) < 0.11;
        const land = Math.sin(longitude * 3.4 + Math.sin(latitude * 4)) + Math.cos(latitude * 8 - longitude * 2.2) > 0.65;
        paintBehind(x, y, rim ? "◌" : land ? "▓" : meridian || parallel ? "·" : "░", rim ? 159 : land ? 46 : meridian || parallel ? 45 : 24);
      }
    }
  }

  points.forEach(({ x, y }) => {
    const relativeY = y - artTop;
    const { angle, trail } = polar(x, y);
    let outputX = x;
    let outputY = y;
    let char = "█";
    let color = palette[mod(x + motionTick, palette.length)];

    if (scene === 0) {
      const ribbon = mod(x + y * 2 - motionTick * 2, 25);
      if (ribbon < 4) char = "▓";
      color = ribbon < 4 ? 231 : palette[mod(x + Math.floor(motionTick / 2), palette.length)];
      outputX += Math.round((hash(Math.floor(x / 4), Math.floor(y / 2), 1) % 5 - 2) * fragment);
    } else if (scene === 1) {
      const cluster = hash(Math.floor(x / 3), Math.floor(y / 2), 3);
      outputX += Math.round((cluster % 9 - 4) * fragment);
      outputY += Math.round(((cluster >>> 4) % 7 - 3) * fragment);
      if (fragment > 0.5) char = "▓";
      color = palette[mod(Math.floor(x / 3) + Math.floor(y / 2) + Math.floor(motionTick / 3), palette.length)];
    } else if (scene === 2) {
      outputX += Math.round(Math.sin(angle) * fragment * 4);
      outputY -= Math.round(Math.cos(angle) * fragment * 2);
      if (trail < 0.32) {
        char = "▓";
        outputX += Math.sign(x - centerX);
      }
      color = trail < 0.45 ? 231 : trail < 1.5 ? 51 : trail < 2.4 ? 201 : 220;
    } else if (scene === 3) {
      const wave = Math.sin(relativeY * 0.8 - motionTick * 0.16);
      const lineWave = Math.sin(Math.floor(relativeY / (fontHeight + 1)) * 1.2 - motionTick * 0.16);
      outputX += fontWidth === 5
        ? Math.round(wave * 0.6 + fragment * 2 * Math.sign(wave))
        : Math.round(lineWave + fragment * Math.sign(lineWave));
      const band = mod(Math.abs(x - centerX) * 0.5 + y * 0.75 - motionTick * 0.8, 18);
      if (band < 4) char = "▓";
      color = band < 4 ? 231 : [45, 51, 201, 231][mod(Math.floor(x / 5) + Math.floor(motionTick / 3), 4)];
    } else if (scene === 4) {
      const gust = Math.max(0, Math.sin(motionTick * 0.12));
      if (relativeY > artHeight / 2) outputX += Math.round((gust + fragment * 2) * Math.sin(relativeY * 0.7));
      if (fragment > 0.6 && relativeY > artHeight / 2) outputY -= 1;
      const heat = mod(relativeY + Math.floor(motionTick / 2), 5);
      color = heat < 2 ? 231 : heat < 4 ? 226 : 220;
      if (gust > 0.8 && relativeY > artHeight / 2) char = "▓";
    } else if (scene === 5) {
      const facet = mod(Math.floor((x - y * 2 + motionTick * 0.65) / 3), 7);
      const shard = hash(Math.floor(x / 3), Math.floor(y / 2), 5);
      outputX += Math.round((shard % 5 - 2) * fragment);
      outputY += Math.round(((shard >>> 4) % 5 - 2) * fragment);
      char = facet === 0 ? "▓" : "█";
      color = facet < 2 ? 231 : [51, 159, 201, 165, 45][facet - 2];
    } else if (scene === 6) {
      const scan = mod(y - motionTick * 0.55, 8);
      outputY -= Math.round((3 + hash(x, 0, 6) % 5) * fragment);
      char = scan < 1.5 ? "▓" : "█";
      color = scan < 1.5 ? 231 : scan < 3 ? 118 : (x + y) % 3 === 0 ? 82 : 46;
    } else if (scene === 7) {
      const frost = mod(x - y + motionTick * 0.45, 12);
      outputX += Math.round((hash(Math.floor(x / 3), y, 7) % 3 - 1) * fragment);
      outputY -= Math.round((2 + hash(x, y, 7) % 3) * fragment);
      char = frost < 2 ? "▓" : "█";
      color = frost < 2 ? 231 : frost < 5 ? 159 : 153;
    } else if (scene === 8) {
      const wind = Math.sin(motionTick * 0.13 + Math.floor(relativeY / (fontHeight + 1)) * 1.2);
      const leaf = hash(Math.floor(x / 3), Math.floor(y / 2), 8);
      outputX += Math.round(wind * 0.7 + (leaf % 5 - 2) * fragment);
      outputY += Math.round((leaf % 3 - 1) * fragment);
      char = mod(x + y * 2 - motionTick, 13) < 3 ? "▓" : "█";
      color = [220, 214, 208, 202, 231][mod(Math.floor(x / 4) + Math.floor(motionTick / 3), 5)];
    } else if (scene === 9) {
      const orbit = mod(angle * 5 - motionTick * 0.11, 7);
      outputX += Math.round(Math.sin(angle) * fragment * 4);
      outputY -= Math.round(Math.cos(angle) * fragment * 3);
      char = orbit < 1.5 ? "▓" : "█";
      color = orbit < 1.5 ? 231 : [201, 159, 51, 231][mod(Math.floor(x / 6) + Math.floor(motionTick / 3), 4)];
    } else if (scene === 10) {
      const scan = mod(y * 2 - motionTick, 13);
      outputX += Math.round(Math.sin(motionTick * 0.1 + Math.floor(relativeY / 2)) * fragment * 2);
      char = scan < 3 ? "▓" : "█";
      color = scan < 3 ? 231 : [46, 51, 201, 226][mod(Math.floor(x / 5) + Math.floor(motionTick / 5), 4)];
    } else if (scene === 11) {
      const chase = mod(x - motionTick * 0.6, 19);
      outputX += Math.round(Math.sin(relativeY + motionTick * 0.12) * fragment);
      char = chase < 4 ? "▓" : "█";
      color = chase < 4 ? 231 : chase < 10 ? 226 : 220;
    } else if (scene === 12) {
      const flash = mod(motionTick, 43) < 5;
      outputX += flash ? Math.round((hash(x, y, 12) % 3 - 1) * fragment) : 0;
      char = flash || mod(x + y - motionTick, 15) < 2 ? "▓" : "█";
      color = flash ? 231 : [33, 45, 159, 231][mod(Math.floor(x / 5) + Math.floor(motionTick / 4), 4)];
    } else if (scene === 13) {
      const swing = Math.sin(motionTick * 0.065 + relativeY * 0.18);
      outputX += Math.round(swing * (0.7 + fragment * 1.5));
      char = mod(x - motionTick * 0.5, 17) < 2 ? "▓" : "█";
      color = char === "▓" ? 231 : [45, 159, 231][mod(Math.floor(x / 6) + Math.floor(motionTick / 7), 3)];
    } else if (scene === 14) {
      const sun = mod(x + y - motionTick * 0.4, 21);
      outputY += Math.round((hash(Math.floor(x / 4), y, 14) % 3 - 1) * fragment);
      char = sun < 3 ? "▓" : "█";
      color = sun < 3 ? 220 : [240, 248, 34, 252][mod(Math.floor(x / 6) + Math.floor(motionTick / 8), 4)];
    } else if (scene === 15) {
      const glow = Math.sin(motionTick * 0.17 + x * 0.25 + relativeY * 0.55);
      outputX += Math.round(glow * fragment);
      char = glow > 0.7 ? "▓" : "█";
      const candle = Math.min(width < 56 ? 1 : 3, Math.floor(x / width * (width < 56 ? 2 : 4)));
      color = candleColor(candleLight(motionTick, candle) * (glow > 0.7 ? 1 : glow > 0 ? 0.95 : 0.85));
    } else {
      const longitude = x * 0.13 + motionTick * 0.045;
      const land = Math.sin(longitude + relativeY * 0.45) > 0.35;
      outputX += Math.round(Math.sin(longitude) * fragment * 2);
      char = mod(x - motionTick * 0.4, 17) < 2 ? "▓" : "█";
      color = char === "▓" ? 231 : land ? 46 : [45, 51, 159][mod(Math.floor(x / 5) + Math.floor(motionTick / 5), 3)];
    }
    paint(outputX, outputY, char, color, scene === 4 ? 52 : 0);
  });

  exactLines.forEach((line, lineIndex) => {
    const chars = Array.from(line);
    const startX = Math.floor((width - chars.length) / 2);
    chars.forEach((char, index) => {
      const x = startX + index;
      const candle = Math.min(width < 56 ? 1 : 3, Math.floor(x / width * (width < 56 ? 2 : 4)));
      paint(x, exactTop + lineIndex, char, scene === 15 ? candleColor(candleLight(motionTick, candle)) : 231);
    });
  });

  const linksWidth = PROFILE_LINKS.reduce((total, link) => total + link.label.length, 0) + (PROFILE_LINKS.length - 1) * 2;
  let linkX = Math.floor((width - linksWidth) / 2);
  const linkY = exactTop + exactLines.length;
  PROFILE_LINKS.forEach((link) => {
    Array.from(link.label).forEach((char) => paint(linkX++, linkY, char, 231, 0, link.href));
    linkX += 2;
  });

  for (let x = 0; x < width; x += 1) {
    frame[0][x] = borderCell(scene, x, 0, width, height, motionTick);
    frame[height - 1][x] = borderCell(scene, x, height - 1, width, height, motionTick);
  }
  for (let y = 1; y < height - 1; y += 1) {
    frame[y][0] = borderCell(scene, 0, y, width, height, motionTick);
    frame[y][width - 1] = borderCell(scene, width - 1, y, width, height, motionTick);
  }
  return frame;
}
