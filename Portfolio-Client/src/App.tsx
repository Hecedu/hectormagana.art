import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import WireguardAdmin from './Views/WireguardAdmin';
import NewUser from './Views/NewUser';
import Login from './Views/Login';


function App() {
  return (
    <Routes>
        <Route path="/" element={<WireguardAdmin />} />
        <Route path="/newuser" element={<NewUser />} />
        <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
