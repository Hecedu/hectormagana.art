import React from "react";
import Typewriter from "typewriter-effect";
import FadeIn from "react-fade-in/lib/FadeIn";
import { SocialIcon } from "react-social-icons";
import { VscFoldDown } from "react-icons/vsc";
import { containerStyle } from "../../../Styles/LayoutStyles";
import { Link } from "react-router-dom";

export default function PresentationCard() {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <div className={containerStyle + " w-100"}>
        <FadeIn transitionDuration={500} delay={500}>
          <h1 className="my-1 display-1 fw-bold">Héctor Magaña</h1>
          <h1 className="display-1 my-3">🤓</h1>
          <h1>
            <Typewriter
              options={{
                strings: [
                  "Software Engineer",
                  "ASP.NET Developer",
                  "Designer",
                  "React Developer",
                  "Artist",
                  "Unity 3D Dev",
                  "Python entusiast",
                  "Xamarin.Forms Developer",
                  "Game Designer",
                  "Learner",
                  "Problem Solver",
                  "Algorithm Lover",
                  "Math Nerd",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
        </FadeIn>
        <hr />
        <div className="d-flex justify-content-center my-1">
          <SocialIcon
            className="mx-1"
            url="https://www.linkedin.com/in/h%C3%A9ctor-maga%C3%B1a/"
          />
          <SocialIcon className="mx-1" url="https://github.com/Hecedu" />
          <SocialIcon
            className="mx-1"
            url="https://docs.google.com/document/d/1hGIn6Vm02KjFbnqe0HuAvZsrBJLUpZqlkS8q5YxXr28/edit?usp=sharing"
          />
        </div>
        <hr />
        <h1>
          <a href={"#projects"}>
            <VscFoldDown className="text-black" href="#projects" />
          </a>
        </h1>
      </div>
    </div>
  );
}
