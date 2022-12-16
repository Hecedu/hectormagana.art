import React from "react";
import { Link } from "react-router-dom";
import { containerStyle } from "../../../../Styles/LayoutStyles";

export default function CoveredCard() {
  return (
    <div className={containerStyle} style={{ background: "linear-gradient(-225deg, rgb(44, 60, 148), rgb(44, 148, 123))" }}>
      <div className="row p-4">
        <div className="container text-center text-light">
          <img className="img-fluid shadow" src={require('../../../../Assets/Covered.png')} style={{ width: "20vh" }} alt="Cromatic logo" />
          <div className="d-flex justify-content-center align-items-bottom">
            <h5 className="my-1 display-5 fw-bold bg-dark h-auto px-2 w-auto">Covered</h5>
          </div>
          <p>Streamlined cover letter generation using GPT3</p>
          <p className="lead">
            <a className="btn btn-info btn-lg shadow" href="https://hecedu.github.io/Cromatic/">
              Create a Cover Letter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}