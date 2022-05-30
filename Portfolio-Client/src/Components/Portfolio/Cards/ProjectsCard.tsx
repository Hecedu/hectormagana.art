import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCard from "../Custom/SwiperCard";
import "swiper/css";
import "swiper/css/bundle";
import { Autoplay } from "swiper";
import { containerStyle } from "../../../Styles/LayoutStyles";
import axios from "axios";
import Project from "../../../Models/Project";

export default function ProjectsCard() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    axios.get(`/api/ProjectPosts`).then((res) => {
      setProjects(res.data);
    });
  }, []);

  return (
    <div className={containerStyle}>
      <h1 className="my-1 display-3 fw-bold">Some of my Projects</h1>
      <p>feel free to swipe!</p>
      <hr />

      {projects.length > 0 ? (
        <Swiper
          modules={[Autoplay]}
          slidesPerView={window.innerWidth <= 760 ? 1 : 2}
          spaceBetween={20}
          centeredSlides={true}
          loop={true}
          className="p-0"
          grabCursor={true}
          autoplay={{ delay: 2500, disableOnInteraction: true }}
        >
          {projects.map((project) => (
            <SwiperSlide className="h-auto" key={project.id}>
              {" "}
              <SwiperCard project={project} />{" "}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
function setComments(data: any) {
  throw new Error("Function not implemented.");
}
