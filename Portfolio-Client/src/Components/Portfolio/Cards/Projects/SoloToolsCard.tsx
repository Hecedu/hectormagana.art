import React from 'react'
import { containerStyle, containerStyleBlack } from '../../../../Styles/LayoutStyles'
import { SocialIcon } from 'react-social-icons'

export default function SoloToolsCard() {
    return (
        <div className={containerStyleBlack} style={{ background: "black" }}>
            <div className="row p-1">
                <div className="container">
                    <div className="d-flex flex-wrap justify-content-center align-items-center">
                        <h1 className='display-4 fw-bold'>Solo Tools</h1>
                    </div>
                    <div className='text-center d-flex p-2'>
                        <h5 className="my-1 display-5 zoom user-select-none">🎲</h5>
                        <h5 className="my-1 display-5 zoom user-select-none">♟️</h5>
                        <h5 className="my-1 display-5 zoom user-select-none">🐉</h5>
                    </div>
                    <p></p>
                    <hr></hr>
                    <p>Board game tools and gizmos</p>
                    <p className="lead">
                        <a className="btn btn-light border border-5 border-dark btn-lg shadow fw-bold zoom" href='https://solotools.hectormagana.art/'>
                            Explore Solo Tools
                        </a>
                        <SocialIcon bgColor="white" fgColor="black"
                            className="mx-3 zoom"
                            url="https://github.com/Hecedu/SoloTools" />
                    </p>
                </div>
            </div>
        </div>
    )
}
