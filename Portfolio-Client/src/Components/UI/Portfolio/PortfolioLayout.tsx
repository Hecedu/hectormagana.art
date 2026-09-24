import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import BbsPageFrame from '../BbsPageFrame'

export default function PortfolioLayout() {
  return (
    <div
      style={{
        background: 'black',
        minHeight: '100vh'
      }}
    >
      <main className='main-content'>
        <BbsPageFrame>
          <Outlet />
        </BbsPageFrame>
      </main>
      <Footer />
    </div>
  )
}
