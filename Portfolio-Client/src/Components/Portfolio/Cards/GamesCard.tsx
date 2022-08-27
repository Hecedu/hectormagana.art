import React from "react";
import { Link, NavLink } from "react-router-dom";
import { containerStyle } from "../../../Styles/LayoutStyles";

export default function GamesCard() {
  return (
    <div className={containerStyle}>
      <div className="row">
        <div className="container text-center">
          <h1 className="my-1 display-3 fw-bold">Cheat Squad</h1>
          <hr className="my-4" />
          <img src="https://img.itch.zone/aW1hZ2UvMTE3NDk5Mi82ODQxNzM2LnBuZw==/original/Rdi9JG.png" className="img-fluid w-75 rounded-3 shadow-sm" alt="..."></img>
          <hr className="my-4"/>
          <p>
            Cheat Squad is a game I created by myself. It's a local
            multiplayer platformer developed using Unity2D and C#.
          </p>
          <hr className="my-4"></hr>
          <Link className="btn btn-success btn-lg mt-3" to="/game">
            Play Cheat Squad
          </Link>
        </div>
      </div>
    </div>
  );
}
