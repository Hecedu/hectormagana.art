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
                        <h3>Google Authentication State:</h3>
                        <div className="overflow-auto p-2">
                            <p>Logged in!</p>
                        </div>
                        <h3>Hector's Authentication State::</h3>
                        {
                            userBearerToken == undefined ?
                                <p>Waiting for Hector's response.</p> :
                                <>
                                    <div className="overflow-auto p-2">
                                        <p>You have access to Hector's Server!</p>
                                    </div>
                                </>
                        }
                        <LogoutButton />
                    </>
            }
        </div>
    )
}
