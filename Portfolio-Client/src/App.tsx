import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import WireguardAdmin from './Views/WireguardAdmin';
import NewUser from './Views/NewUser';
import Login from './Views/Login';
import Nav from './Components/UI/Nav';


function App() {
  return (
    <div>
      <Nav/>
      <Routes>
        <Route path="/" element={<WireguardAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/secure" element={<NewUser />} />
        <Route path="/newuser" element={<NewUser />} />
      </Routes>
    </div>
  );
}

export default App;
