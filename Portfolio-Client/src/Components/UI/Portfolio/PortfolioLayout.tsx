import chroma from 'chroma-js'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Nav from './Nav'

export default function PortfolioLayout() {
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
        minHeight: '100vh'
      }}
    >
      <Nav />
      <div className='main-content'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
