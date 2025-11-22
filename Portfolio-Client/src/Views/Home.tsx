import React from "react";
import ContactCard from "../Components/Portfolio/Cards/ContactCard";
import CromaticCard from "../Components/Portfolio/Cards/Projects/CromaticCard";
import CheatSquadCard from "../Components/Portfolio/Cards/Projects/CheatSquadCard";
import PresentationCard from "../Components/Portfolio/Cards/PresentationCard";
import TruffleCard from "../Components/Portfolio/Cards/Projects/TruffleCard";
import BllageCard from "../Components/Portfolio/Cards/Projects/BllageCard";
import SoloToolsCard from "../Components/Portfolio/Cards/Projects/SoloToolsCard";
import PixiePaintCard from "../Components/Portfolio/Cards/Projects/PixiePaintCard";

export default function Home() {
  return (
    <div className="container cards-grid">
      <div id="about" className="grid-card full-width-card">
        <PresentationCard />
      </div>
      <div id="bllage" className="grid-card">
        <BllageCard />
      </div>
      <div id="pixiepaint" className="grid-card">
        <PixiePaintCard />
      </div>
      <div id="cromatic" className="grid-card">
        <CromaticCard />
      </div>
      <div id="solo" className="grid-card">
        <SoloToolsCard />
      </div>
      <div id="truffle" className="grid-card">
        <TruffleCard />
      </div>
      <div id="games" className="grid-card">
        <CheatSquadCard />
      </div>
      <div id="contactinfo" className="grid-card full-width-card">
        <ContactCard />
      </div>
    </div>
  );
}
