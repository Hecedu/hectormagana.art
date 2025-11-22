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
          <h4>Email:</h4>
          <p className="font-weight-bold">hector.maganahdez@gmail.com</p>
          <h4>Phone:</h4>
          <p className="font-weight-bold">+801 822 7188</p>
          <h4>Other Connections:</h4>
          <div className="d-flex justify-content-center my-1">
            <SocialIcon
              className="mx-1 zoom"
              url="https://www.linkedin.com/in/hecedu/"
            />
            <SocialIcon
              className="mx-1 zoom"
              url="https://github.com/Hecedu" />
            <SocialIcon
              className="mx-1 zoom"
              url="https://docs.google.com/document/d/1hGIn6Vm02KjFbnqe0HuAvZsrBJLUpZqlkS8q5YxXr28/edit?usp=sharing"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
