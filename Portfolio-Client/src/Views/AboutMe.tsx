import React from "react";
import { containerStyle } from "../Styles/LayoutStyles";
import { Link } from "react-router-dom";
import HeceduLogo from "../Assets/Hecedu.png";

export default function AboutMe() {
  return (
    <div className="container py-3">
      <div className={containerStyle + " position-relative pb-3"}>
        <h1 className="display-4 fw-bold my-2">About Me</h1>
        <hr className="mt-1 mb-3" />
        <div className="text-start px-4 lead fs-5" style={{ paddingBottom: "140px" }}>
          <p>
            Heyo! Hector here! </p>
          <p>
            My origin story starts in El Salvador, and has currently taken me to Salt Lake City, Utah.
          </p>
          <p>
            By day, I’m a software engineer; by night, I’m sketching, painting, composing, tinkering, and generally making things that probably have no business existing—except to make someone smile.
          </p>
          <p>
            Most of my creative compass points toward video game design. That’s where my personal development philosophy, “Toy-Like Design,” comes from.
          </p>
          <p>It’s built on three simple convictions: </p>
          <ul>
            <li>
              Products should be fun to use
            </li>
            <li>
              Products should be fun to build

            </li>
            <li>
              Products should be made up of simple parts
            </li>
          </ul>
          <p>
            Thanks for poking around my page and trying out the little toys I’ve cobbled together.
            If one of them wins your heart, tell me. If one of them doesn’t, definitely tell me. I’ll tinker until it behaves.
          </p> 
          <p>Now let’s all keep making fun stuff!
          </p>
          <div className="d-flex justify-content-center my-3">
            <Link className="btn btn-dark btn-lg" to="/">
              Back to Home
            </Link>
          </div>
        </div>
        <img
          src={HeceduLogo}
          alt="Hecedu logo"
          className="position-absolute"
          style={{ width: "200px", maxWidth: "38vw", right: "1rem", bottom: "1rem" }}
        />
      </div>
    </div>
  );
}
