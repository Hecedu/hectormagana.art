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
          <>
            <h1>You need to be logged in to view this page</h1>
            <Link className="btn btn-dark" to="/login">
              Login
            </Link>
          </>
        ) : (
          <>
            <UserData />
          </>
        )}
      </div>
    </div>
  );
}
