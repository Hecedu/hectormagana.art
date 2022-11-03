import React from "react";
import { Link } from "react-router-dom";
import { containerStyle } from "../../../Styles/LayoutStyles";

export default function TruffleCard() {
  return (
    <div className={containerStyle}>
      <div className="row">
        <div className="container text-center ">
          <img className="img-fluid my-1" src={require('../../../Assets/truffle_logo.png')} style={{ width: "250px" }} alt="Pigs flying with the word 'home' attached" />
          <h5>Dig the past of the internet.</h5>
          <p>Truffle! is a lightweight Wayback Machine client that streamlines the experience of looking for snapshots of your favorite pages.</p>
          <p className="lead">
            <a className="btn btn-info btn-lg" href="https://hecedu.github.io/Truffle/">
              Dig the web!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
