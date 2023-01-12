import React from "react";
import { Link } from "react-router-dom";
import { terminalContainerStyle } from "../../../../Styles/LayoutStyles";
import Typewriter from "typewriter-effect";

export default function TerminalCard() {
    return (
        <div className={terminalContainerStyle}>
            <div className="row py-4">
                <div className="container text-center text-white">
                    <h1 className="my-1 display-3 fw-bold">
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter.typeString('The_Terminal')
                                typewriter.start()
                            }}
                        />
                    </h1>
                    <p>The terminal is a personal blog about programming, writing, music, videogames and design.</p>
                    <hr></hr>
                    <p className="lead">
                        <Link className="btn btn-light btn-lg zoom" to="/terminal">
                            Acccess the terminal
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
