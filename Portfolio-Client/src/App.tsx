import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NewUser from './Views/NewUser';
import Login from './Views/Login';
import Nav from './Components/UI/Nav';
import Home from './Views/Home';
import Secure from './Views/Secure';
import Instagram from './Views/Instagram';
import Instagram_No_Warnings from './Views/Instagram_No_Warnings';


function App() {
  return (
    <div>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/secure" element={<Secure />} />
        <Route path="/newuser" element={<NewUser />} />
        <Route path='/instagram' element={<Instagram />} />
        <Route path="/instagram_no_warnings" element={<Instagram_No_Warnings />} />
      </Routes>
    </div>
  );
}

export default App;
