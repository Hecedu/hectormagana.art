import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import messenger from "../../Assets/InnerSpaceMessenger.png";
import "./InnerSpaceMessenger.css";

export default function InnerSpaceMessenger() {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const checkBottom = () => {
      const pageHeight = document.documentElement.scrollHeight;
      setAtBottom(window.scrollY > 0 && window.scrollY + window.innerHeight >= pageHeight - 2);
    };

    window.addEventListener("scroll", checkBottom, { passive: true });
    window.addEventListener("resize", checkBottom);
    return () => {
      window.removeEventListener("scroll", checkBottom);
      window.removeEventListener("resize", checkBottom);
    };
  }, []);

  return (
    <Link
      className={`innerspace-messenger${atBottom ? " innerspace-messenger--visible" : ""}`}
      to="/innerspace"
      aria-label="Explore InnerSpace"
      aria-hidden={!atBottom}
      tabIndex={atBottom ? undefined : -1}
    >
      <img src={messenger} alt="InnerSpace messenger" />
    </Link>
  );
}
