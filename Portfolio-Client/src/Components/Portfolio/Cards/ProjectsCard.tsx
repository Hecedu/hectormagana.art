import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCard from "../Custom/SwiperCard";
import "swiper/css";
import "swiper/css/bundle";
import { Autoplay } from "swiper";
import { containerStyle } from "../../../Styles/LayoutStyles";
export default function ProjectsCard() {
  return (
    <div className={containerStyle}>
      <h1 className="my-1 display-3 fw-bold">Some of my Projects</h1>
      <p>feel free to swipe!</p>
      <hr />
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
        <SwiperSlide className="h-auto">
          <SwiperCard
            title={"Cheat Squad"}
            content={
              "Cheat Squad is a 2-player game your main objective is to throw your opponent out of the stage using your gun."
            }
            extraInfo={"Developed using Unity 2D and C#."}
            links={[
              "https://b-llage.itch.io/cheat-squad",
              "https://github.com/Hecedu/Cheat-Squad",
            ]}
          />
        </SwiperSlide>
        <SwiperSlide className="h-auto">
          <SwiperCard
            title={"Cromatic"}
            content={"Simple and beautiful color palette generation tool."}
            extraInfo={"Developed using React, Typescript and Chroma.js."}
            links={["https://hecedu.github.io/Cromatic/"]}
          />
        </SwiperSlide>
        <SwiperSlide className="h-auto">
          <SwiperCard
            title={"imCARD website"}
            content={
              "Created a responsive business website for imCARD the leading number portability provider in El Salvador."
            }
            extraInfo={"Developed using HTML 5 and CSS."}
            links={["https://imcard.com.sv/"]}
          />
        </SwiperSlide>
        <SwiperSlide className="h-auto">
          <SwiperCard
            title={"Yu-Gi-Oh! Collection Manager"}
            content={
              "Yu-Gi-Oh! app that allows the user to search cards from the community Yu-Gi-Oh! API and add them to their collection."
            }
            extraInfo={"Developed using React.Js, API consumption using Axios."}
            links={["https://hecedu.github.io/YuGiOh-Card-Manager/"]}
          />
        </SwiperSlide>
        <SwiperSlide className="h-auto">
          <SwiperCard
            title={"Health Tracker App"}
            content={
              "Health logger app in Xamarin.Forms. It connects to a third party API for food searches and retrieves data from my own custom identity authorizer and cloud storage API."
            }
            extraInfo={"Developed using Xamarin.Forms"}
            links={["https://github.com/Hecedu/HealthLogger"]}
          />
        </SwiperSlide>
        <SwiperSlide className="h-auto">
          <SwiperCard
            title={"Health Tracker Storage and Authentication API"}
            content={
              "A secured identity and data storage API for my mobile application. used OAUTH to aunthenticate an user and then give them access to their data which is stored in a database. It was previously deployed in Azure Cloud Services."
            }
            extraInfo={"Developed using ASP.NET"}
            links={["https://github.com/Hecedu/HealthTrackerAPI"]}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
