import React, { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";
import Unity, { UnityContext } from "react-unity-webgl";
import { containerStyle } from "../Styles/LayoutStyles";

const unityContext = new UnityContext({
  loaderUrl: process.env.PUBLIC_URL + "/Build/cheatsquad.loader.js",
  dataUrl: process.env.PUBLIC_URL + "/Build/cheatsquad.data",
  frameworkUrl: process.env.PUBLIC_URL + "/Build/cheatsquad.framework.js",
  codeUrl: process.env.PUBLIC_URL + "/Build/cheatsquad.wasm",
});
export default function GameView() {
  const [progression, setProgression] = useState(0);
  const [scrolledTop, setScrolledTop] = useState(false);
  const keyStyle: React.CSSProperties = {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "clamp(2rem, 7vw, 2.75rem)",
    minHeight: "clamp(2rem, 7vw, 2.75rem)",
    padding: "0.45rem 0.6rem",
    borderRadius: "0.6rem",
    backgroundColor: "rgba(255,255,255,0.95)",
    color: "#101729",
    fontFamily: "'Space Mono', 'IBM Plex Mono', monospace",
    fontWeight: 700,
    fontSize: "clamp(0.85rem, 2.2vw, 1.1rem)",
    border: "2px solid rgba(0,0,0,0.65)",
    boxShadow: "0 0.4rem 0 rgba(0,0,0,0.25)",
    textShadow: "none",
  };

  const renderKeys = (keys: string[]) => (
    <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
      {keys.map((key) => {
        const normalized =
          key.replace(/[^a-zA-Z0-9]/g, "") || key.charCodeAt(0).toString();
        return (
          <span key={normalized} style={keyStyle}>
            {key}
          </span>
        );
      })}
    </div>
  );

  const controlCards = [
    {
      title: "Player 1",
      accent: "text-info",
      move: ["W", "A", "S", "D"],
      jump: ["F"],
      shoot: ["G"],
    },
    {
      title: "Player 2",
      accent: "text-warning",
      move: ["I", "J", "K", "L"],
      jump: [";"],
      shoot: ["'"],
    },
  ];

  useEffect(
    function () {
      unityContext.on("canvas", function (canvas) {
      });
    },
    [unityContext]
  );



  useEffect(function () {
    unityContext.on("progress", function (progression) {
      setProgression(progression);
    });
    unityContext.on("customEvent", function () { });
    return function () {
      unityContext.removeAllEventListeners();
    };
  }, []);

  useEffect(() => {
    if (progression >= 1 && !scrolledTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setScrolledTop(true);
    }
  }, [progression, scrolledTop]);

  return (
    <div className="container d-flex justify-content-center mt-4">
      <div className="text-center">
        {progression < 1 ? (
          <p>Loading {Math.floor(progression * 100)}%</p>
        ) : (
          <></>
        )}
        <Unity
          unityContext={unityContext}
          matchWebGLToCanvasSize={true}
          style={{
            width: "min(100%, 64em)",
            aspectRatio: "16 / 9",
            maxHeight: "36em",
          }}
        />
        <div
          className={`${containerStyle} `}
          style={{
            backgroundColor: "#0d1733",
            borderColor: "rgba(14,27,56,0.6)",
            maxWidth: "64em",
            margin: "2rem auto 0",
          }}
        >
          <div className="px-3 px-lg-4 py-4">
            <h2
              className="text-uppercase fw-bold mb-2"
              style={{ letterSpacing: "clamp(0.15rem, 0.8vw, 0.35rem)" }}
            >
              Controls
            </h2>
            <p className="opacity-75 mb-4">
              Master your movement, keep your shots timed, and remember: winning means cheating smarter than your rival.
            </p>
            <div className="row g-4 justify-content-center">
              {controlCards.map((card) => (
                <div className="col-12 col-lg-6" key={card.title}>
                  <div className="h-100 px-4 py-4 rounded-4 border border-light border-opacity-50 bg-black bg-opacity-25 shadow-lg">
                    <h3
                      className={`text-uppercase fw-bold mb-4`}
                      style={{
                        letterSpacing: "clamp(0.12rem, 0.7vw, 0.25rem)",
                        fontSize: "clamp(1.15rem, 2.4vw, 1.75rem)",
                      }}
                    >
                      {card.title}
                    </h3>
                    <div className="d-flex flex-column gap-3">
                      <div>
                        <span className="text-uppercase small fw-semibold">
                          Move
                        </span>
                        {renderKeys(card.move)}
                      </div>
                      <div>
                        <span className="text-uppercase small fw-semibold">
                          Jump
                        </span>
                        {renderKeys(card.jump)}
                      </div>
                      <div>
                        <span className="text-uppercase small fw-semibold">
                          Shoot
                        </span>
                        {renderKeys(card.shoot)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <hr className="border-light border-opacity-25 my-4" />
            <div className="text-start  small">
              <p className="mb-2">
                Credits: Programming, Graphics, Animation, Game and Sound Design by
                Héctor Magaña.
              </p>
              <p className="mb-2">Music by Sawsquarenoise.</p>
              <p className="fst-italic mb-3">Technologies: Unity2D, C#, WebGL.</p>
              <div className="d-flex align-items-center gap-2">
                <span>Play or download more on Itch.io:</span>
                <SocialIcon className="mx-1" url="https://b-llage.itch.io/cheat-squad" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
