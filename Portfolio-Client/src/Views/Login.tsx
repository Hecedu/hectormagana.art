import GoogleLogin from "react-google-login";
import LoginButton from "../Components/Auth/LoginButton";
import LogoutButton from "../Components/Auth/LogoutButton";
import { useStoreSelector } from "../Store";

export default function Login() {
    var userToken = useStoreSelector((state) => state.auth.userToken);
    var userBearerToken = useStoreSelector((state) => state.auth.bearerToken);
    return (
        <div className='container border border-dark border-5 rounded p-3 my-2 shadow text-center'>
            <h1>Login</h1>
            {
                userToken == undefined ?
                    <LoginButton /> :
                    <>
                        <h3>User JWT:</h3>
                        <div className="overflow-auto p-2">
                            <p>{userToken}</p>
                        </div>
                        {
                            userBearerToken == undefined ?
                                <p>Authentication Failed</p> :
                                <>
                                    <h3>Bearer Token:</h3>
                                    <div className="overflow-auto p-2">
                                        <p>{userBearerToken}</p>
                                    </div>
                                </>
                        }
                        <LogoutButton />
                    </>
            }
        </div>
    )
}
