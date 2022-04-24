import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Views/Login";
import Nav from "./Components/UI/Nav";
import Home from "./Views/Home";
import Profile from "./Views/Profile";
import Game from "./Views/Game";
import Footer from "./Components/UI/Footer";
import MoodBoard from "./Views/MoodBoard";
import WireguardRequest from "./Views/WireguardRequest";

function App() {
  return (
    <div
      style={{
        background: `linear-gradient(45deg, #00ffb3, #9300ff)`,
      }}
    >
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/game" element={<Game />} />
        <Route path="/moodboard" element={<MoodBoard/>} />
        <Route path="/wireguard" element={<WireguardRequest />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
