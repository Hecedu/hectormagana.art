import React from 'react'
import { containerStyle } from '../../../../Styles/LayoutStyles'

export default function BllageCard() {
    return (
        <div className={containerStyle} style={{ background: "white" }}>
            <div className="row p-4">
                <div className="container">
                    <div className="d-flex flex-wrap justify-content-center align-items-center">
                        <img className="img-fluid mb-2 bllagelogo" src={require('../../../../Assets/Bllage.png')} style={{ width: "20vh" }} alt="Covered logo" />
                        <div className='text-start px-2 '>
                            <h2 className="my-1 display-5 fw-bold h-auto w-auto">No Fun, No Code</h2>
                            <h5>Working hard to save you time, so we can waste it later.</h5>
                        </div>
                    </div>
                    <p></p>
                    <hr></hr>
                    <p className="lead">
                        <a className="btn btn-light border border-5 border-dark btn-lg shadow fw-bold zoom" href='https://b-llage.itch.io/'>
                            Storefront
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
