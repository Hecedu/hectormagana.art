import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { containerStyle } from "../../../../Styles/LayoutStyles";

export default function CheatSquadCard() {
  return (

    <div className="cheat-squad-card position-relative w-100 h-100 text-center border border-5 border-dark rounded-3 overflow-hidden mx-1 my-4 shadow bg-white">
      <img
        src="https://img.itch.zone/aW1hZ2UvMTE3NDk5Mi82ODQxNzM2LnBuZw==/original/Rdi9JG.png"
        className="img-fluid shadow-sm user-select-none"
        alt="Cheat Squad gameplay screenshot"
      ></img>
      <div
        className="position-absolute top-50 start-50 translate-middle"
        style={{
          color: "#ffffff",
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.75), rgba(0,0,0,0.55))",
          padding: "0.5rem 1rem",
          borderRadius: "2rem",
          border: "3px solid rgba(231, 221, 221, 0.2)",
          boxShadow: "0 0.75rem 2.5rem rgba(0, 0, 0, 0.45)",
        }}
      >
        <img
          src={require("../../../../Assets/CheatSquadLogo.png")}
          alt="Cheat Squad logo"
          className="img-fluid mb-3 user-select-none"
          style={{ width: "260px" }}
        />
        <div className="d-flex align-items-center justify-content-center">
          <Link className="btn btn-success btn-lg mx-2 mb-3 zoom" to="/game">
            Play
          </Link>
          <SocialIcon
            className="mx-2 mb-3 zoom"
            url="https://b-llage.itch.io/cheat-squad" />
        </div>
      </div>
    </div>);
}
