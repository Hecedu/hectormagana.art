import axios from 'axios';
import React from 'react'
import { UserData } from '../Types/UserData';

export default function NewUser() {
    var username = '';
    var password = '';
    function OnUserNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        username = event.target.value;
    }
    function OnPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        password = event.target.value;
    }
    function OnSubmit() {
        let userData: UserData = {username, password, salt:""}
        axios.post('/api/UserData/AddUserData', userData)
        .then(function (response) {
            alert(response)
        })
        .catch(function (error) {
            console.log(error)
        });
    }
    return (
        <div className='text-center'>
            <div className='container border border-primary rounded p-2 my-2 shadow-sm'>
                <h1>Create New User</h1>
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
            </div>
        </div>
    )
}
