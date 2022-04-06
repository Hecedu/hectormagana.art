import React from "react";
import Typewriter from "typewriter-effect";
import FadeIn from "react-fade-in/lib/FadeIn";
import { SocialIcon } from "react-social-icons";
import { VscFoldDown } from "react-icons/vsc";

export default function PresentationCard() {
  return (
    <div className="vh-100 d-flex align-items-center">
      <div className=" d-flex flex-column  text-center container">
        <FadeIn transitionDuration={500} delay={300}>
          <h1 className="my-1 display-1 fw-bold">Héctor Magaña 👨🏽‍💻</h1>
          <h1>
            <Typewriter
              options={{
                strings: [
                  "Software Engineer",
                  "ASP.NET Dev",
                  "Designer",
                  "React Dev",
                  "Artist",
                  "Unity 3D Dev",
                  "Python entusiast",
                  "Xamarin.Forms Dev",
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
          <p className="my-1 fs-5">Welcome to my portfolio.</p>
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
          <VscFoldDown />
        </h1>
      </div>
    </div>
  );
}
