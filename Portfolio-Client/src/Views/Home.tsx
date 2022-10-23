import React from "react";
import BlogCard from "../Components/Portfolio/Cards/BlogCard";
import ContactCard from "../Components/Portfolio/Cards/ContactCard";
import GamesCard from "../Components/Portfolio/Cards/GamesCard";
import PresentationCard from "../Components/Portfolio/Cards/PresentationCard";
import ProjectsCard from "../Components/Portfolio/Cards/ProjectsCard";
import TerminalCard from "../Components/Portfolio/Cards/TerminalCard";

export default function Home() {
  return (
    <div className="container">
      <div id="about">
        <PresentationCard />
      </div>
      <div id="projects">
        <ProjectsCard />
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
