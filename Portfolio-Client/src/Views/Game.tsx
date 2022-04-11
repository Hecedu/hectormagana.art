import React, { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: process.env.PUBLIC_URL + "/Build/cheatsquad.loader.js",
  dataUrl: process.env.PUBLIC_URL + "/Build/cheatsquad.data",
  frameworkUrl: process.env.PUBLIC_URL + "/Build/cheatsquad.framework.js",
  codeUrl: process.env.PUBLIC_URL + "/Build/cheatsquad.wasm",
});
export default function GameView() {
  const [progression, setProgression] = useState(0);
  useEffect(
    function () {
      unityContext.on("canvas", function (canvas) {
        canvas.width = 1024;
        canvas.height = 576;
      });
    },
    [unityContext]
  );

  useEffect(function () {
    unityContext.on("progress", function (progression) {
      setProgression(progression);
    });
    unityContext.on("customEvent", function () {});
    return function () {
      unityContext.removeAllEventListeners();
    };
  }, []);

  return (
    <div className="container d-flex justify-content-center mt-2">
      <div className="text-center">
        {progression < 1 ? (
          <p>Loading {Math.floor(progression * 100)}%</p>
        ) : (
          <></>
        )}
        <Unity
          unityContext={unityContext}
          matchWebGLToCanvasSize={true}
          style={{ width: "1024px", height: "576px" }}
        />
        <div className="text-center border border-dark border-4 p-3 m-3 rounded-3 shadow bg-white">
          <p className="my-0">
            Credits: Programming, Graphics, Animation, Game and Sound Design by
            Héctor Magaña. Music by Sawsquarenoise.
          </p>
          <p className="fst-italic small my-0"> Technologies: Unity2D, C#</p>
          <p>
            Instructions: Player 1 moves using WASD, jumps with F shoots with G.
            Player 2 moves using IJKL, jumps with ; shoots with '
          </p>
          <SocialIcon
            className="mx-1"
            url="https://b-llage.itch.io/cheat-squad"
          />
        </div>
      </div>
    </div>
  );
}
