import React from "react";
import { SocialIcon } from "react-social-icons";

interface SwiperCardProps {
  title: string;
  content: string;
  extraInfo: string;
  links: string[];
}
export default function SwiperCard({
  title,
  content,
  extraInfo,
  links,
}: SwiperCardProps) {
  return (
    <div className="h-100 d-flex align-items-center mx-3 border border-dark border-3 rounded-3 shadow-sm py-3">
      <div className="container mx-auto">
        <h2 className={"mb-3"}>{title}</h2>
        <p>{content}</p>
        <p className={"fst-italic"}>{extraInfo}</p>
        {links.map((link) => {
          return <SocialIcon className="mx-1 my-0" url={link} />;
        })}
      </div>
    </div>
  );
}
