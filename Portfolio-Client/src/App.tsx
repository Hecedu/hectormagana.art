import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import WireguardAdmin from './Views/WireguardAdmin';
import NewUser from './Views/NewUser';
import Login from './Views/Login';


function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand " href="/">Hector Magana</a>
          <div className="navbar-nav">
            <a className="nav-link" href="/">Home</a>
            <a className="nav-link" href="/login">Login</a>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<WireguardAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/secure" element={<NewUser/>} />
        <Route path="/newuser" element={<NewUser />} />
      </Routes>
    </div>
  );
}

export default App;
