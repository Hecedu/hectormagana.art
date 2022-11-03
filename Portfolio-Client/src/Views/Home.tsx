import React from "react";
import BlogCard from "../Components/Portfolio/Cards/BlogCard";
import ContactCard from "../Components/Portfolio/Cards/ContactCard";
import CromaticCard from "../Components/Portfolio/Cards/CromaticCard";
import GamesCard from "../Components/Portfolio/Cards/GamesCard";
import PresentationCard from "../Components/Portfolio/Cards/PresentationCard";
import ProjectsCard from "../Components/Portfolio/Cards/ProjectsCard";
import TerminalCard from "../Components/Portfolio/Cards/TerminalCard";
import TruffleCard from "../Components/Portfolio/Cards/TruffleCard";

export default function Home() {
  return (
    <div className="container">
      <div id="about">
        <PresentationCard />
      </div>
      <div id="cromatic">
        <CromaticCard/>
      </div>
      <div id="truffle">
        <TruffleCard/>
      </div>
      <div id="terminal">
        <TerminalCard/>
      </div>
      <div id="games">
        <GamesCard />
      </div>
      <div id="contact">
        <ContactCard />
      </div>
    </div>
  );
}
