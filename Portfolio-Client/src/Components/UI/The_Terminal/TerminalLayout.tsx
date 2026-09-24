import React from 'react'
import { Outlet } from 'react-router-dom'
import BbsPageFrame from '../BbsPageFrame'

export default function TerminalLayout() {
    return (
        <div
            style={{
                background: `black`,
                minHeight: `100vh`,
            }}>
            <main className='main-content text-white'>
                <BbsPageFrame>
                    <Outlet />
                </BbsPageFrame>
            </main>
        </div>
    )
}
