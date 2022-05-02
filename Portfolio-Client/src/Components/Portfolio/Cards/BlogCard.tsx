import React from "react";
import { Link } from "react-router-dom";
import { containerStyle } from "../../../Styles/LayoutStyles";

export default function BlogCard() {
  return (
    <div className={containerStyle}>
      <div className="row">
        <div className="container text-center ">
          <h1 className="my-1 display-3 fw-bold">My Personal Blog</h1>
          <hr className="my-4" />
          <p className="lead">
            <Link className="btn btn-success btn-lg" to="/blog">
              Go to my blog
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
