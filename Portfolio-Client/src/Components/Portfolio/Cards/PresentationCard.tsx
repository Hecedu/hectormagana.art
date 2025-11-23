import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
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
        <div className="presentation-card-content">
          <div className="row g-4 align-items-center mt-1 mb-4">
            <div className="col-12 col-lg-6 d-flex justify-content-center">
              <img
                className="img-fluid rounded user-select-none"
                src={profilePicture}
                style={{ width: "100%", maxWidth: "360px" }}
                alt="Hector Magana headshot"
                onClick={handleProfilePictureClick}
              />
            </div>
            <div className="col-12 col-lg-6 text-start px-5 px-lg-0">
              <h1 className="my-1 display-3 fw-bold">Héctor Magaña</h1>
              <h1>
                <Typewriter
                  options={{
                    strings: [
                      "Software Engineer",
                      "React Developer",
                      "Unity 3D Dev",
                      "Designer",
                      "Artist",
                      "ASP.NET Developer",
                      "Python enthusiast",
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
                url="https://www.linkedin.com/in/hecedu/"
              />
              <SocialIcon
                className="mx-1 zoom"
                url="https://github.com/Hecedu" />
              <a className="btn btn-primary btn-lg zoom m-2" href="https://docs.google.com/document/d/e/2PACX-1vRvf27qHY0aa3-MtCL6QHPSe5C0iK7vxqAEGT7xALxI_SNLoWf7LSVp_xulV3VpIB8JMiwzpg9ZpB0d/pub">
                Resume
              </a>
            </div>
            
          </div>
          <div>
            <a href={"#bllage"}>
              <AiFillCaretDown className="text-black p-0 zoom" style={{ width: "5em" }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
