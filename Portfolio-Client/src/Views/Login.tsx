import axios from 'axios';
import React, { useState } from 'react'

export default function Login() {
    const [userName, setUserName] = useState<string>('Waiting for input...');
    const [userHashedPassword, setUserHashedPassword] = useState<string>('Waiting for input...');
    const [userSalt, setUserSalt] = useState<string>('Waiting for input...');
    var username = '';
    var password = '';
    function OnUserNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        username = event.target.value;
    }
    function OnPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        password = event.target.value;
    }
    function OnSubmit(){
        axios.get(`/api/UserData/GetUserDataByUsername?username=${username}`)
        .then(function (response) {
            setUserName(response.data.username)
            setUserHashedPassword(response.data.password)
            setUserSalt(response.data.salt)
        })
        .catch(function (error) {
            console.log(error)
        });
    }
    return (
        <div className='container border border-primary rounded p-2 my-2 shadow-sm'>
            <h1>Login</h1>
            <div className='my-2'>
                <label className='m-1'>username:</label>
                <input type="text" name="name" onChange={OnUserNameChange} />
            </div>
            <div className='my-2'>
                <label className='m-1'>password:</label>
                <input type="text" name="name" onChange={OnPasswordChange} />
            </div>
            <div className='my-2'>
                <button className="btn btn-primary" type="submit" value="Submit" onClick={OnSubmit}>Submit</button>
            </div>
            <h2>user: {userName}</h2>
            <h2>hash: {userHashedPassword}</h2>
            <h2>salt: {userSalt}</h2>
        </div>
    )
}
