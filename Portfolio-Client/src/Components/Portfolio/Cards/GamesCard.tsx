import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function GamesCard() {
  return (
    <div className="text-center border border-dark border-4 p-5 mb-5 rounded-3 shadow bg-white">
      <div className="row">
        <div className="container text-center">
          <h1 className="my-1 display-3 fw-bold">Play Cheat Squad</h1>
          <hr className="my-4" />
          <p>
            Cheat Squad is a game I developed on my free time. It's a local
            multiplayer platformer.
          </p>
          <h5>You can play it by pressing the button:</h5>
          <hr></hr>
          <Link className="btn btn-success btn-lg" to="/game">
            insert coin
          </Link>
        </div>
      </div>
    </div>
  );
}
