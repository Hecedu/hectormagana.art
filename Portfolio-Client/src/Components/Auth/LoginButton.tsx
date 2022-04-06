import React, { FC } from "react";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import { useDispatch } from "react-redux";
import { StoreDispatch } from "../../Store";
import { authenticateUser, setToken } from "../../Store/auth-slice";

const LoginButton: FC = (): JSX.Element => {
  const dispatch = useDispatch<StoreDispatch>();
  const clientId: string =
    "216463964469-1uop6pd4rfv1e8e2i2ajk585hl51g8o2.apps.googleusercontent.com";

  const onSuccess = (res: any) => {
    dispatch(setToken(res.tokenId));
    dispatch(authenticateUser(res.tokenId));
  };

  const onFailure = (res: GoogleLoginResponse) => {
    alert("Login unsucsessfull");
  };

  return (
    <div className="mx-1">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        cookiePolicy="single_host_origin"
        theme="dark"
      />
    </div>
  );
};

export default LoginButton;
