import React, { useEffect, useState } from "react";
import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Login from "./Views/Login";
import Nav from "./Components/UI/Portfolio/Nav";
import Home from "./Views/Home";
import Profile from "./Views/Profile";
import Game from "./Views/Game";
import MoodBoard from "./Views/BlogPosts";
import chroma, { hsl } from "chroma-js";
import PortfolioLayout from "./Components/UI/Portfolio/PortfolioLayout";
import TerminalLayout from "./Components/UI/The_Terminal/TerminalLayout";
import Terminal_Home from "./Views/The_Terminal/Terminal_Home";
import AboutMe from "./Views/AboutMe";


function App() {


  return (
    <>
      <Routes>
        <Route element={<PortfolioLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="game" element={<Game />} />
          <Route path="moodboard" element={<MoodBoard />} />
          <Route path="about-me" element={<AboutMe />} />
        </Route>
        <Route element={<TerminalLayout />}>
          <Route path="terminal">
            <Route path="" element={<Terminal_Home />} />
          </Route>
        </Route>
      </Routes>

    </>
  );
}

export default App;
