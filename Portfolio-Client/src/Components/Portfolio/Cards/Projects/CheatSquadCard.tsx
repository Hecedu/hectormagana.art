import React from "react";
import { Link, NavLink } from "react-router-dom";
import { containerStyle } from "../../../../Styles/LayoutStyles";

export default function CheatSquadCard() {
  return (
    <div className={containerStyle}>
      <div className="row px-3">
        <div className="container text-center">
          <img src="https://img.itch.zone/aW1hZ2UvMTE3NDk5Mi82ODQxNzM2LnBuZw==/original/Rdi9JG.png" className="img-fluid rounded-3 shadow-sm" alt="..."></img>
          <h1 className="mt-2 display-3 fw-bold">Cheat Squad</h1>
          <hr className="my-4" />
          <p>Cheat Squad is a game I created by myself using Unity2D and C#.</p>
          <p>It's a local multiplayer platformer where the only way to win is to cheat.</p>
          <Link className="btn btn-success btn-lg mt-3" to="/game">
            Play Cheat Squad
          </Link>
        </div>
      </div>
    </div>
  );
}
