import { FC } from "react";
import { GoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { StoreDispatch } from "../../Store";
import { logout } from "../../Store/auth-slice";

const LogoutButton: FC = (): JSX.Element => {
    const dispatch = useDispatch<StoreDispatch>();

    const clientId = "216463964469-1uop6pd4rfv1e8e2i2ajk585hl51g8o2.apps.googleusercontent.com";

    const onFailure = () => {
        alert('Could not log you out');
    }

    const onLogoutSuccess = () => {
        dispatch(logout());
    }

    return (
        <div className = "mx-1">
            <GoogleLogout
                clientId={clientId}
                buttonText='Logout'
                onFailure={onFailure}
                onLogoutSuccess={onLogoutSuccess} 
                icon={false}
            />
        </div>
    )
}

export default LogoutButton;