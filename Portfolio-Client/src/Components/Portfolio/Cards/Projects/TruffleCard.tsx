import React from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { containerStyle } from "../../../../Styles/LayoutStyles";

export default function TruffleCard() {
  return (
    <div className={containerStyle}>
      <div className="row p-4">
        <div className="container text-center ">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-1">
            <img
              className="img-fluid my-1 user-select-none"
              src={require('../../../../Assets/truffle_logo.png')}
              style={{ width: "300px", marginLeft: "-0.5rem" }}
              alt="Pigs flying with the word 'home' attached"
            />
          </div>
            <img
              className="img-fluid user-select-none"
              src={require('../../../../Assets/pig_blinking_sm_wht.gif')}
              style={{ width: "120px" }}
              alt="Blinking truffle pig"
            />
          <p>Dig the past of the internet.</p>
          <hr></hr>
          <p className="lead">
            <a className="btn btn-secondary btn-lg shadow text-light zoom" href="https://hecedu.github.io/Truffle/">
              Dig The Web!
            </a>
            <SocialIcon bgColor="black" fgColor="white"
              className="m-3 zoom"
              url="https://github.com/Hecedu/Truffle" />
          </p>
        </div>
      </div>
    </div>
  );
}
