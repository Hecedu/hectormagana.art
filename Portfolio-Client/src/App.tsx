import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Views/Login";
import Nav from "./Components/UI/Nav";
import Home from "./Views/Home";
import Profile from "./Views/Profile";
import Game from "./Views/Game";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
