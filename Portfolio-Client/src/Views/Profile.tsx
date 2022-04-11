import React from "react";
import { Link } from "react-router-dom";
import UserData from "../Components/UserData/UserData";
import { useStoreSelector } from "../Store";

export default function Profile() {
  var userToken = useStoreSelector((state) => state.auth.userToken);
  return (
    <div className="text-center">
      <div className="text-center border border-dark border-4 p-3 m-3 rounded-3 shadow bg-white">
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
