import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark shadow">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Hector Magana</Link>
      <div className="navbar-nav">
        <div className='nav-item'>
          <Link className="nav-link" to="/">Home</Link>
        </div>
        <div className='nav-item'>
          <Link className="nav-link" to="/login">Login</Link>
        </div>
        <div className='nav-item'>
          <Link className="nav-link text-danger" to="/secure">Secure</Link>
        </div>
      </div>
    </div>
  </nav>
  )
}
