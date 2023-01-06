import React from "react";
import { Link } from "react-router-dom";
import { containerStyle } from "../../../../Styles/LayoutStyles";

export default function TruffleCard() {
  return (
    <div className={containerStyle}>
      <div className="row p-4">
        <div className="container text-center ">
          <img className="img-fluid my-1" src={require('../../../../Assets/truffle_logo.png')} style={{ width: "300px" }} alt="Pigs flying with the word 'home' attached" />
          <h2>Dig the past of the internet.</h2>
          <p className="m-0">Truffle! is a fun Wayback Machine client. </p>
          <p> It allows you to explore snapshots of your favorite pages using the WayBack Machine.</p>
          <hr></hr>
          <p className="lead">
            <a className="btn btn-secondary btn-lg shadow text-light" href="https://hecedu.github.io/Truffle/">
              Dig The Web!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
