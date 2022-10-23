import React from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

export default function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/terminal">

                    <Typewriter
                    options={{cursor:''}}
                        onInit={(typewriter) => {
                            typewriter.typeString('The_Terminal')
                            typewriter.start()
                        }}
                    />

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
                                Go Back
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
