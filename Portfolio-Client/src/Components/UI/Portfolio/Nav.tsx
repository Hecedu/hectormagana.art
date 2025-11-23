import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow fixed-top" style={{ backgroundColor: 'black' }}>
      <div className="container-fluid">
        <a className="navbar-brand px-4" href="/#me">
          Héctor Magaña
        </a>
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
              <div className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Projects
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><a className="dropdown-item" href="/#bllage">B-llage</a></li>
                  <li><a className="dropdown-item" href="/#pixiepaint">Pixie Paint</a></li>
                  <li><a className="dropdown-item" href="/#cromatic">Cromatic</a></li>
                  <li><a className="dropdown-item" href="/#truffle">Truffle</a></li>
                  <li><a className="dropdown-item" href="/#solo">SoloTools</a></li>
                  <li><a className="dropdown-item" href="/#games">Cheat Squad</a></li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#contactinfo">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
