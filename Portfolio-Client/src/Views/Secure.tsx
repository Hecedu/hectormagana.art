import React from 'react'
import { Link } from 'react-router-dom';
import UserData from '../Components/Secure/UserData';
import { useStoreSelector } from '../Store';

export default function Secure() {
    var userToken = useStoreSelector((state) => state.auth.userToken);
    return (

        <div className="text-center">
            <div className='container border border-dark border-5 rounded p-2 my-2 shadow'>
                {
                    userToken == undefined ?
                        <>
                            <h1>You need to be logged in to view this page</h1>
                            <Link className='btn btn-dark' to="/login">Login</Link>
                        </> :
                        <>
                            <h1>You are logged in!</h1>
                            <UserData/>
                        </>
                }
            </div>
        </div>
    )
}
