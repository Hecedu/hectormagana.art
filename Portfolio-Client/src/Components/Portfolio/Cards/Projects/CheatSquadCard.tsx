import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { containerStyle } from "../../../../Styles/LayoutStyles";

export default function CheatSquadCard() {
  return (
    <div className={containerStyle}>
      <div className="row px-3">
        <div className="container text-center">
          <img src="https://img.itch.zone/aW1hZ2UvMTE3NDk5Mi82ODQxNzM2LnBuZw==/original/Rdi9JG.png" className="img-fluid rounded-3 shadow-sm" alt="..."></img>
          <h1 className="mt-2 display-3 fw-bold">Cheat Squad</h1>
          <p>Cheat Squad is a game developed by myself using Unity2D and C#.</p>
          <p>It's a local multiplayer platformer where the only way to win is to cheat.</p>
          <hr className="my-4" />
          <div className="d-flex align-items-center justify-content-center">
            <Link className="btn btn-success btn-lg mx-2 mb-3 zoom" to="/game">
              Play Cheat Squad
            </Link>
            <SocialIcon
              className="mx-2 mb-3 zoom"
              url="https://b-llage.itch.io/cheat-squad" />
          </div>
        </div>
      </div>
    </div>
  );
}
