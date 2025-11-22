import React from "react";
import { containerStyle } from "../../../../Styles/LayoutStyles";

export default function BllageCard() {
  return (
    <div className={`${containerStyle} bllage-card`}>
      <div className="row g-0 h-100">
        <div className="col-12 col-lg-6 checkerboard-bg d-flex justify-content-center align-items-center p-4">
          <img
            className="img-fluid bllagelogo user-select-none"
            src={require("../../../../Assets/Bllage.png")}
            style={{ width: "20vh" }}
            alt="B-Llage logo"
          />
        </div>
        <div className="col-12 col-lg-6 bg-white text-dark p-1 bllage-card__content">
          <div className="text-start">
            <p className="bllage-tagline mb-0">
              <span className="bllage-tagline__accent">Working hard</span> to save
              your time,
            </p> 
            <p className="bllage-tagline">
              so we can <span className="bllage-tagline__accent">waste it later.</span>
            </p>
          </div>
          <hr className="my-2" />
          <p className="lead mb-0">
            <a
              className="btn btn-light border border-5 border-dark btn-lg shadow fw-bold zoom"
              href="https://b-llage.itch.io/"
            >
              Storefront
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
