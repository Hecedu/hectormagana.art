import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Views/Login";
import Nav from "./Components/UI/Nav";
import Home from "./Views/Home";
import Profile from "./Views/Profile";
import Game from "./Views/Game";
import Footer from "./Components/UI/Footer";
import MoodBoard from "./Views/BlogPosts";
import chroma, { hsl } from "chroma-js";

function App() {
  const [backgroundColorOne, setBackgroundColorOne] = useState("#FFFFFF")
  const [backgroundColorTwo, setBackgroundColorTwo] = useState("#FFFFFF")
  
  useEffect(() => {
    let baseHue = Math.floor(Math.random() * 361)
    let complimentaryHue = baseHue + 180 > 360 ? (baseHue + 180 - 360) : (baseHue + 180)
    console.log(baseHue + " " + complimentaryHue)
    let initOne = chroma(baseHue, 1, 0.5, 'hsl')
    let initTwo = chroma(complimentaryHue, 1, 0.5, 'hsl')
    setBackgroundColorOne(initOne.hex())
    setBackgroundColorTwo(initTwo.hex())
  }, []);

  return (
    <div
      style={{
        background: `linear-gradient(0deg, ${backgroundColorOne}, ${backgroundColorTwo})`,
        minHeight: `100vh`,
        paddingTop: `56px`,
      }}
    >
      <Nav />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/game" element={<Game />} />
          <Route path="/moodboard" element={<MoodBoard />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
