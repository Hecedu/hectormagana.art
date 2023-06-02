import React from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { containerStyle } from "../../../../Styles/LayoutStyles";

export default function CoveredCard() {
  return (
    <div className={containerStyle} style={{ background: "linear-gradient(45deg, rgb(44, 60, 148), rgb(44, 148, 123))" }}>
      <div className="row p-4">
        <div className="container text-center text-light">
          <img className="img-fluid shadow" src={require('../../../../Assets/Covered.png')} style={{ width: "20vh" }} alt="Covered logo" />
          <div className="d-flex justify-content-center align-items-bottom">
            <h5 className="my-1 display-5 fw-bold h-auto px-2 w-auto">Covered</h5>
          </div>
          <p className="fst-italic">A JobMind AI tool</p>
          <p>Easy cover letter generation using GPT3</p>
          <hr></hr>
          <p className="lead">
            <a className="btn btn-info btn-lg shadow zoom" href="https://covered.jobmindai.xyz/">
              Create a Cover Letter
            </a>
            <SocialIcon bgColor="black" fgColor="white"
              className="m-3 zoom"
              url="https://github.com/B-Llage/Covered" />
          </p>
        </div>
      </div>
    </div>
  );
}
