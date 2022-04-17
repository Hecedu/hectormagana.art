import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark shadow sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Héctor Magaña
        </Link>
        <div className="navbar-nav">
          <div className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </div>
          <div className="nav-item">
            <Link className="nav-link" to="/moodboard">
              MoodBoard
            </Link>
          </div>
          <div className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </div>
          <div className="nav-item">
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
