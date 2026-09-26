import React from "react";
import setPieces from "../Assets/InnerSpaceSetPieces.png";
import "./InnerSpace.css";

export default function InnerSpace() {
  return (
    <section className="innerspace-teaser" aria-label="InnerSpace preview">
      <img className="innerspace-teaser__scene" src={setPieces} alt="A messenger beside a moonlit river leading to the sea" />
      <p className="innerspace-teaser__description">
        Water from the heavens always makes it to the sea—will you be able to make it there too?
      </p>
    </section>
  );
}
