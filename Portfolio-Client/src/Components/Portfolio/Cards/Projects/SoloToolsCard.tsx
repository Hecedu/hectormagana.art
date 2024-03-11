import React from 'react'
import { containerStyle, containerStyleBlack } from '../../../../Styles/LayoutStyles'
import { SocialIcon } from 'react-social-icons'

export default function SoloToolsCard() {
    return (
        <div className={containerStyleBlack} style={{ background: "black" }}>
            <div className="row p-4">
                <div className="container">
                    <div className="d-flex flex-wrap justify-content-center align-items-center">
                        <h1 className='display-1 fw-bold'>SoloTools</h1>
                    </div>
                    <div className='text-center '>
                        <h5 className="my-1 h-auto w-auto">Boardgame tools</h5>
                    </div>
                    <div className='text-center d-flex p-2'>
                        <h5 className="my-1 display-1 zoom user-select-none">🎲</h5>
                        <h5 className="my-1 display-1 zoom user-select-none">♟️</h5>
                        <h5 className="my-1 display-1 zoom user-select-none">🐉</h5>
                    </div>
                    <p></p>
                    <hr></hr>
                    <p className="lead">
                        <a className="btn btn-light border border-5 border-dark btn-lg shadow fw-bold zoom" href='https://solotools.hectormagana.art/'>
                            Explore SoloTools
                        </a>
                        <SocialIcon bgColor="white" fgColor="black"
                            className="m-3 zoom"
                            url="https://github.com/Hecedu/SoloTools" />
                    </p>
                </div>
            </div>
        </div>
    )
}
