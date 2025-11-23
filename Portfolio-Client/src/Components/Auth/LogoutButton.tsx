import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { StoreDispatch } from "../../Store";
import { logoutUser } from "../../Store/auth-slice";

const LogoutButton: FC = (): JSX.Element => {
  const dispatch = useDispatch<StoreDispatch>();

  const clientId =
    "216463964469-1uop6pd4rfv1e8e2i2ajk585hl51g8o2.apps.googleusercontent.com";

  const onFailure = () => {
    alert("Unable to logout. Please try again.");
  };

  const onLogoutSuccess = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="mx-1">
    </div>
  );
};

export default LogoutButton;
