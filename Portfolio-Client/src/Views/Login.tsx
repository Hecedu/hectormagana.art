import GoogleLogin from "react-google-login";
import LoginButton from "../Components/Auth/LoginButton";
import LogoutButton from "../Components/Auth/LogoutButton";
import { useStoreSelector } from "../Store";
import axios from 'axios';

export default function Login() {
    var userToken = useStoreSelector((state) => state.auth.userToken);
    return (
        <div className='container border border-primary rounded p-2 my-2 shadow-sm text-center'>
            <h1>Login</h1>
            <div className="overflow-auto">
                <h3>User Token:</h3>
                <p>{userToken}</p>
            </div>
            {
                userToken == undefined ?
                <LoginButton/> :
                <LogoutButton/>
            }
        </div>
    )
}
