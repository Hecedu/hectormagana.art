import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import WireguardAdmin from './Views/WireguardAdmin';
import NewUser from './Views/NewUser';


function App() {
  return (
    <Routes>
        <Route path="/" element={<WireguardAdmin />} />
        <Route path="/newuser" element={<NewUser />} />
    </Routes>
  );
}

export default App;
