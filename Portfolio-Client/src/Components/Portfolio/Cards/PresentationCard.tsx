import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import FadeIn from "react-fade-in/lib/FadeIn";
import { SocialIcon } from "react-social-icons";
import { AiFillCaretDown } from "react-icons/ai";
import { containerStyle } from "../../../Styles/LayoutStyles";
import { Link } from "react-router-dom";

const pfp = require('../../../Assets/hector_headshot.jpg')
const petpfp = require('../../../Assets/pet.gif')
export default function PresentationCard() {
  const [profilePictureClicks, setProfilePictureClicks] = useState(0);
  const [profilePicture, setProfilePicture] = useState(pfp);

  const handleProfilePictureClick = () => {
    if (profilePictureClicks === 5) {
      setProfilePictureClicks(0);
    }
    else {
      setProfilePictureClicks(profilePictureClicks + 1);
    }
  };

  useEffect(() => {
    if (profilePictureClicks === 5) {
      setProfilePicture(petpfp);
    }
    else {
      setProfilePicture(pfp);
    }
  }, [profilePictureClicks]);


  return (
    <div className="vh-auto d-flex align-items-center justify-content-center">
      <div className={containerStyle + " w-100 bg-white"}>
        <FadeIn transitionDuration={400} delay={200}>
          <div className="d-flex flex-wrap justify-content-center align-items-center mt-1 mb-4">
            <img className="img-fluid mx-3 rounded" src={profilePicture} style={{ width: "250px" }} alt="Hector Magana headshot" onClick={handleProfilePictureClick} />
            <div className="text-start">
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
            </div>
          </div>
          <div>
            <hr />
            <div className="d-flex justify-content-center align-items-center my-1">
              <SocialIcon
                className="mx-1 zoom"
                url="https://www.linkedin.com/in/h%C3%A9ctor-maga%C3%B1a/"
              />
              <SocialIcon
                className="mx-1 zoom"
                url="https://github.com/Hecedu" />
              <a className="btn btn-primary btn-lg zoom m-2" href="https://docs.google.com/document/d/e/2PACX-1vRvf27qHY0aa3-MtCL6QHPSe5C0iK7vxqAEGT7xALxI_SNLoWf7LSVp_xulV3VpIB8JMiwzpg9ZpB0d/pub">
                Resume
              </a>
            </div>
            <hr />
          </div>
          <div>
            <a href={"#bllage"}>
              <AiFillCaretDown className="text-black p-0 zoom" style={{ width: "5em" }} />
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
