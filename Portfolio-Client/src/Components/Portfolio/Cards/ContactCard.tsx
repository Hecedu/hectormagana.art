import React from "react";
import { SocialIcon } from "react-social-icons";
import { containerStyle } from "../../../Styles/LayoutStyles";

export default function ContactCard() {
  return (
    <div className={containerStyle + " mb-5"}>
      <div className="row">
        <div className="container text-center ">
          <h1 className="my-1 display-3 fw-bold">Contact Me!</h1>
          <hr className="my-2" />
          <h4>Email (my preferred method):</h4>
          <p className="font-weight-bold">hector.maganahdez[at]gmail[dot]com</p>
          <h4>Other Connections:</h4>
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
      </div>
    </div>
  );
}
