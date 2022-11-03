import React from "react";
import Typewriter from "typewriter-effect";
import FadeIn from "react-fade-in/lib/FadeIn";
import { SocialIcon } from "react-social-icons";
import { AiFillCaretDown } from "react-icons/ai";
import { containerStyle } from "../../../Styles/LayoutStyles";
import { Link } from "react-router-dom";

export default function PresentationCard() {
  return (
    <div className="vh-auto d-flex align-items-center justify-content-center">
      <div className={containerStyle + " w-100"}>
        <FadeIn transitionDuration={500} delay={500}>
          <img className="img-fluid my- rounded-circle zoom" src={require('../../../Assets/hector_headshot.jpg')} style={{ width: "250px" }} alt="Cromatic logo" />
          <h1 className="my-1 display-3 fw-bold">Héctor Magaña</h1>
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
            className="mx-1 zoom"
            url="https://www.linkedin.com/in/h%C3%A9ctor-maga%C3%B1a/"
          />
          <SocialIcon
            className="mx-1 zoom"
            url="https://github.com/Hecedu" />
          <SocialIcon
            className="mx-1 zoom"
            url="https://docs.google.com/document/d/1hGIn6Vm02KjFbnqe0HuAvZsrBJLUpZqlkS8q5YxXr28/edit?usp=sharing"
          />
        </div>
        <hr />
        <p>
          <a href={"#cromatic"}>
            <AiFillCaretDown className="text-black p-0 zoom"/>
          </a>
        </p>
      </div>
    </div>
  );
}
