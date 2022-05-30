import React from "react";
import { SocialIcon } from "react-social-icons";
import { containerStyle } from "../../../Styles/LayoutStyles";

export default function ContactCard() {
  return (
    <div className={containerStyle+" mb-5"}>
      <div className="row">
        <div className="container text-center ">
          <h1 className="my-1 display-3 fw-bold">Contact Me!</h1>
          <hr className="my-4" />
          <h4>Email:</h4>
          <p className="font-weight-bold">hector.maganahdez@gmail.com</p>
          <h4>Phone:</h4>
          <p className="font-weight-bold">+801 822 7188</p>
          <h4>Github:</h4>
          <div className="container d-flex justify-content-center">
            <SocialIcon className="mx-1" url="https://github.com/Hecedu" />
          </div>
        </div>
      </div>
    </div>
  );
}
