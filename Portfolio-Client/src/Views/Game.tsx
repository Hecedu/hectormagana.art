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
          style={{ width: "64em", height: "36em" }}
        />
        <div className={containerStyle}>
          <div className="border border-3 border-black rounded container p-1 my-1">
            <p className="fs-4 p-0 m-0"> Player 1: </p>
            <div className="d-flex justify-content-center align-items-center container gap-1">
              <p className="fs-5 p-0 m-0"> Move: </p>
              <img style={{ width: "2em" }} src="https://key.pics/key/W.svg?style=flat&color=black&labelColor=white&fontFamily=Roboto" />
              <img style={{ width: "2em" }} src="https://key.pics/key/A.svg?style=flat&color=black&labelColor=white&fontFamily=Roboto" />
              <img style={{ width: "2em" }} src="https://key.pics/key/S.svg?style=flat&color=black&labelColor=white&fontFamily=Roboto" />
              <img style={{ width: "2em" }} src="https://key.pics/key/D.svg?style=flat&color=black&labelColor=white&fontFamily=Roboto" />
              <p className="fs-5 p-0 m-0"> Jump: </p>
              <img style={{ width: "2em" }} src="https://key.pics/key/F.svg?style=flat&color=black&labelColor=white&fontFamily=Roboto" />
              <p className="fs-5 p-0 m-0"> Shoot: </p>
              <img style={{ width: "2em" }} src="https://key.pics/key/G.svg?style=flat&color=black&labelColor=white&fontFamily=Roboto" />
            </div>
          </div>
          <div className="border border-3 border-black rounded container p-1 my-1">
          <p className="fs-4 p-0 m-0"> Player 2: </p>
          <div className="d-flex justify-content-center align-items-center container gap-1">
            <p className="fs-5 p-0 m-0"> Move: </p>
            <img style={{ width: "2em" }} src="https://key.pics/key/I.svg?style=flat&color=black&labelColor=white&fontFamily=Roboto" />
            <img style={{ width: "2em" }} src="https://key.pics/key/J.svg?style=flat&color=black&labelColor=white&fontFamily=Roboto" />
            <img style={{ width: "2em" }} src="https://key.pics/key/K.svg?style=flat&color=black&labelColor=white&fontFamily=Roboto" />
            <img style={{ width: "2em" }} src="https://key.pics/key/L.svg?style=flat&color=black&labelColor=white&fontFamily=Roboto" />
            <p className="fs-5 p-0 m-0"> Jump: </p>
            <img style={{ width: "2em" }} src="https://key.pics/key/;.svg?style=flat&color=black&labelColor=white&fontFamily=Roboto" />
            <p className="fs-5 p-0 m-0"> Shoot: </p>
            <img style={{ width: "2em" }} src="https://key.pics/key/'.svg?style=flat&color=black&labelColor=white&fontFamily=Roboto" />
          </div>
          </div>
          <p className="m-2">
            Credits: Programming, Graphics, Animation, Game and Sound Design by
            Héctor Magaña. 
          </p>
          <p>Music by Sawsquarenoise.</p>
          <p className="fst-italic small my-0"> Technologies: Unity2D, C#, WebGl</p>
          <SocialIcon
            className="mx-1"
            url="https://b-llage.itch.io/cheat-squad"
          />
        </div>
      </div>
    </div>
  );
}
