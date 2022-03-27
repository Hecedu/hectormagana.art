import React from 'react'

export default function Nav() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
    <div className="container-fluid">
      <a className="navbar-brand " href="/">Hector Magana</a>
      <div className="navbar-nav">
        <div className='nav-item'>
          <a className="nav-link" href="/">Home</a>
        </div>
        <div className='nav-item'>
          <a className="nav-link" href="/login">Login</a>
        </div>
      </div>
    </div>
  </nav>
  )
}
