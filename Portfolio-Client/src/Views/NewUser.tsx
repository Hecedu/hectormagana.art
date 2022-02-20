import React from 'react'

export default function NewUser() {
    var username = '';
    var password = '';
    function OnUserNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        username = event.target.value;
    }
    function OnPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        password = event.target.value;
    }
    function onSubmitForm() {
    }
    return (
        <div>
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
                    <button className="btn btn-primary" type="submit" value="Submit" onClick={onSubmitForm}>Submit</button>
                </div>
            </div>
        </div>
    )
}
