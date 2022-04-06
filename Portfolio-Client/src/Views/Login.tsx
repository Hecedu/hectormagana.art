import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "../Components/Auth/LoginButton";
import LogoutButton from "../Components/Auth/LogoutButton";
import { useStoreSelector } from "../Store";

export default function Login() {
  var userToken = useStoreSelector((state) => state.auth.userToken);
  var userBearerToken = useStoreSelector((state) => state.auth.bearerToken);
  return (
    <div className="text-center border border-dark border-4 p-5 m-3 rounded-3 shadow">
      <h1>Login</h1>
      {userToken === undefined ? (
        <LoginButton />
      ) : (
        <>
          <h3>Google Authentication State:</h3>
          <div className="overflow-auto p-2">
            <p>Logged in!</p>
          </div>
          <h3>Hector's Authentication State:</h3>
          {userBearerToken === undefined ? (
            <p>Waiting for Hector's response.</p>
          ) : (
            <>
              <div className="overflow-auto p-2">
                <p>You have access to Hector's Server!</p>
              </div>
              <Link to="/profile" className="btn btn-success btn-lg">View your data!</Link>
            </>
          )}
          <LogoutButton />
        </>
      )}
    </div>
  );
}
