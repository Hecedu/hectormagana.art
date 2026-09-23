import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Nav from './Nav'

export default function PortfolioLayout() {
  return (
    <div
      style={{
        background: 'black',
        minHeight: '100vh'
      }}
    >
      <Nav />
      <div className='main-content'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
