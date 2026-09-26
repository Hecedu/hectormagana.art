import React from "react";
import CromaticCard from "../Components/Portfolio/Cards/Projects/CromaticCard";
import CheatSquadCard from "../Components/Portfolio/Cards/Projects/CheatSquadCard";
import TruffleCard from "../Components/Portfolio/Cards/Projects/TruffleCard";
import BllageCard from "../Components/Portfolio/Cards/Projects/BllageCard";
import SoloToolsCard from "../Components/Portfolio/Cards/Projects/SoloToolsCard";
import PixiePaintCard from "../Components/Portfolio/Cards/Projects/PixiePaintCard";
import AsciiBanner from "../Components/Portfolio/AsciiBanner";
import InnerSpaceMessenger from "../Components/Portfolio/InnerSpaceMessenger";

export default function Home() {
  return (
    <>
      <AsciiBanner />
      <div className="container cards-layout">
        <div className="cards-grid">
          <div id="bllage" className="grid-card">
            <BllageCard />
          </div>
          <div id="pixiepaint" className="grid-card">
            <PixiePaintCard />
          </div>
          <div id="cromatic" className="grid-card">
            <CromaticCard />
          </div>
          <div id="truffle" className="grid-card">
            <TruffleCard />
          </div>
          <div id="solo" className="grid-card">
            <SoloToolsCard />
          </div>
          <div id="games" className="grid-card">
            <CheatSquadCard />
          </div>
        </div>
      </div>
      <InnerSpaceMessenger />
    </>
  );
}
