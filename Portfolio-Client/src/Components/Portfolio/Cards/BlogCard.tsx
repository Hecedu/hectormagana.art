import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard() {
  return (
    <div className="text-center border border-dark border-4 p-5 mb-5 rounded-3 shadow">
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
