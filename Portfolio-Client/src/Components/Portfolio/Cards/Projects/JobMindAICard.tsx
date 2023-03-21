import React from 'react'
import { containerStyleBlack } from '../../../../Styles/LayoutStyles'

export default function JobMindAICard() {
    return (
        <div className={containerStyleBlack} style={{ background: "black" }}>
            <div className="row p-4">
                <div className="container text-center text-light">
                    <img className="img-fluid shadow border border-white rounded-4" src={require('../../../../Assets/Jobmind.png')} style={{ width: "20vh" }} alt="Jobmind logo" />
                    <div className="d-flex justify-content-center align-items-bottom">
                        <h5 className="my-1 display-5 fw-bold h-auto px-2 w-auto">JobMind AI</h5>
                    </div>
                    <p>Introducing the future of Job Hunting.</p>
                    <hr></hr>
                    <p className="lead">
                        <a className="btn btn-black text-white border border-white btn-lg shadow zoom" href="https://jobmindai.xyz/">
                            Explore JobMind AI
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
