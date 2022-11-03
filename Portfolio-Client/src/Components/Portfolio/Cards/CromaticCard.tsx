import React from "react";
import { Link } from "react-router-dom";
import { containerStyle } from "../../../Styles/LayoutStyles";

export default function CromaticCard() {
  return (
    <div className={containerStyle} style={{ background: "linear-gradient(45deg, #942c2c, #2c9494" }}>
      <div className="row">
        <div className="container text-center text-light">
          <img className="img-fluid shadow" src={require('../../../Assets/Cromatic.png')} style={{ width: "150px" }} alt="Cromatic logo" />
          <div className="d-flex justify-content-center align-items-bottom">
            <h5 className="my-1 display-3 fw-bold bg-dark h-auto px-2 w-auto">Cromatic</h5>
          </div>
          <p>Streamlined color palette generation using Chroma.js</p>
          <p className="lead">
            <a className="btn btn-danger btn-lg" href="https://hecedu.github.io/Cromatic/">
              Create a palette
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
