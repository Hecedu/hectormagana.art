import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Héctor Magaña
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/moodboard">
                  MoodBoard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item"> 
                <Link className="nav-link text-danger" to="/wireguard">
                  wireguard [TEST]
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  );
}
