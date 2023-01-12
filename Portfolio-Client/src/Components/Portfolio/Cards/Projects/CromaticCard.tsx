import React from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { containerStyle } from "../../../../Styles/LayoutStyles";

export default function CromaticCard() {
  return (
    <div className={containerStyle} style={{ background: "linear-gradient(45deg, #942c2c, #2c9494" }}>
      <div className="row p-4">
        <div className="container text-center text-light">
          <img className="img-fluid shadow" src={require('../../../../Assets/Cromatic.png')} style={{ width: "20vh" }} alt="Cromatic logo" />
          <div className="d-flex justify-content-center align-items-bottom">
            <h5 className="my-1 display-5 fw-bold h-auto px-2 w-auto">Cromatic</h5>
          </div>
          <p>Streamlined color palette generation using Chroma.js</p>
          <hr></hr>
          <p className="lead">
            <a className="btn btn-danger btn-lg shadow zoom" href="https://hecedu.github.io/Cromatic/">
              Create a Palette
            </a>
            <SocialIcon bgColor="black" fgColor="white"
                className="m-3 zoom"
                url="https://github.com/Hecedu/Cromatic" />
          </p>
        </div>
      </div>
    </div>
  );
}
