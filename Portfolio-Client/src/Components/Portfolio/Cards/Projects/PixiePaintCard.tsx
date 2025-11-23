import React, { useEffect, useState } from "react";
import { containerStyleBlack } from "../../../../Styles/LayoutStyles";

export default function PixiePaintCard() {
  const pixiePaintLabel = "Visit Pixie Paint";
  const palette = [
    "#ff2975",
    "#ffd319",
    "#00c2ff",
    "#7b61ff",
    "#00f5a0",
    "#ff6f61",
    "#ffb347",
    "#8cffda",
  ];

  const buildPattern = () => {
    const pick = () => palette[Math.floor(Math.random() * palette.length)];
    const colors = [pick(), pick(), pick(), pick()];
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'><rect width='2' height='2' fill='${colors[0]}'/><rect x='2' width='2' height='2' fill='${colors[1]}'/><rect y='2' width='2' height='2' fill='${colors[2]}'/><rect x='2' y='2' width='2' height='2' fill='${colors[3]}'/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  };

  const [pattern, setPattern] = useState<string>("");

  useEffect(() => {
    setPattern(buildPattern());
  }, []);

  const shufflePattern = () => {
    setPattern(buildPattern());
  };

  return (
    <div
      className={`${containerStyleBlack} pixie-paint-card`}
      style={{
        backgroundImage: pattern || undefined,
        backgroundRepeat: "repeat",
        backgroundSize: "1.5rem 1.5rem",
        backgroundColor: "#050505",
      }}
    >
      <div className="row h-100 mx-2">
        <div
          className="align-items-center justify-content-center"

        >
          <img
            className="pixie-paint-logo zoom user-select-none"
            src={require("../../../../Assets/PixiePaintLogo.png")}
            alt="Pixie Paint logo"
            onClick={shufflePattern}
            role="button"
            aria-label="Shuffle Pixie Paint background colors"
          />
        </div>
        <div className="bg-black text-start justify-content-center py-3 rounded-3">
          <p className="text-center">
            Web Pixel Art Editor
          </p>
          <p className="lead mb-0 d-flex justify-content-center">
            <a
              className="btn btn-dark btn-lg shadow zoom pixie-paint-cta"
              href="https://pixiepaint.hectormagana.art/"
            >
              {pixiePaintLabel.split("").map((char, index) => (
                <span key={index} className="rainbow-letter">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
