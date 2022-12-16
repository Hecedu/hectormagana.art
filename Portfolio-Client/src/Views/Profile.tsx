import React from "react";
import { Link } from "react-router-dom";
import UserData from "../Components/UserData/UserData";
import { useStoreSelector } from "../Store";
import { containerStyle } from "../Styles/LayoutStyles";

export default function Profile() {
  var userToken = useStoreSelector((state) => state.auth.userToken);
  return (
    <div className="container text-center">
      <div className={containerStyle}>
        {userToken === undefined ? (
          <div className="p-5">
            <h1>You need to be logged in to view this page</h1>
            <p>This is a demonstration of an Auth0 integration, it will let you store information about yourself in my website.</p>
            <Link className="btn btn-dark" to="/login">
              Login
            </Link>
          </div>
        ) : (
          <>
            <UserData />
          </>
        )}
      </div>
    </div>
  );
}
