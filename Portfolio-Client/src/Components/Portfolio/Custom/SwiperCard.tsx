import React from "react";
import { SocialIcon } from "react-social-icons";
import Project from "../../../Models/Project";

interface SwiperCardProps {
  project: Project;
}
export default function SwiperCard({ project }: SwiperCardProps) {
  return (
    <div className="h-100 d-flex align-items-center mx-3 border border-dark border-3 rounded-3 shadow-sm py-3">
      <div className="container mx-auto">
        <h2 className={"mb-3"}>{project.title}</h2>
        <p>{project.content}</p>
        <div className="mb-3">
          <p className={"fst-italic"}>{project.extra_info}</p>
          {project.image_url != undefined ? (
            <img
              className="img-fluid user-select-none"
              src={project.image_url}
              alt={project.title}
            />
          ) : null}
        </div>
        {project.links.map((link) => {
          return <SocialIcon className="mx-1 my-0" url={link} />;
        })}
      </div>
    </div>
  );
}
