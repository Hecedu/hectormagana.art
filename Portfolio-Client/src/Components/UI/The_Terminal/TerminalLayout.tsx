import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'

export default function TerminalLayout() {
    return (
        <div
            style={{
                background: `black`,
                minHeight: `100vh`,
            }}>
            <Nav />
            <div className='main-content text-white px-4'>
                <Outlet />
            </div>
        </div>
    )
}
