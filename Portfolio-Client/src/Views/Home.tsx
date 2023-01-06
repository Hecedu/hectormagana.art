import React from "react";
import ContactCard from "../Components/Portfolio/Cards/ContactCard";
import CromaticCard from "../Components/Portfolio/Cards/Projects/CromaticCard";
import CheatSquadCard from "../Components/Portfolio/Cards/Projects/CheatSquadCard";
import PresentationCard from "../Components/Portfolio/Cards/PresentationCard";
import TerminalCard from "../Components/Portfolio/Cards/Projects/TerminalCard";
import TruffleCard from "../Components/Portfolio/Cards/Projects/TruffleCard";
import CoveredCard from "../Components/Portfolio/Cards/Projects/CoveredCard";
import BllageCard from "../Components/Portfolio/Cards/Projects/BllageCard";

export default function Home() {
  return (
    <div className="container">
      <div id="about">
        <PresentationCard />
      </div>
      <div id="bllage">
        <BllageCard />
      </div>
      <div id="cromatic">
        <CromaticCard />
      </div>
      <div id="covered">
        <CoveredCard />
      </div>
      <div id="truffle">
        <TruffleCard />
      </div>
      <div id="terminal">
        <TerminalCard />
      </div>
      <div id="games">
        <CheatSquadCard />
      </div>
      <div id="contact">
        <ContactCard />
      </div>
    </div>
  );
}
