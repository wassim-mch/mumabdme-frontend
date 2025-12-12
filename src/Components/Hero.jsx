import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import hero1 from "/assets/hero1.jpeg"; 
import hero2 from "/assets/hero2.jpg";
import hero3 from "/assets/hero3.jpg";

const Hero = () => {
  return (
    <div className="hero-container">

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        speed={800}
        className="hero-swiper"
      >
        {/* ----- SLIDE 1 ----- */}
        <SwiperSlide>
          <div
            className="hero-slide"
            style={{ backgroundImage: `url(${hero1})` }}
          >
            <div className="hero-content">
              <h1>Renforcer le lien, vivre la douceur</h1>
              <hr className="hero-divider" />
              <p className="hero-subtext">
                Un espace chaleureux dédié aux mamans et à leurs bébés.
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* ----- SLIDE 2 ----- */}
        <SwiperSlide>
          <div
            className="hero-slide"
            style={{ backgroundImage: `url(${hero2})` }}
          >
            <div className="hero-content">
              <h1>La douceur qui prend soin de votre bébé</h1>
              <hr className="hero-divider" />
              <p className="hero-subtext">
                Des soins adaptés pour le bien-être et l'éveil sensoriel.
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* ----- SLIDE 3 ----- */}
        <SwiperSlide>
          <div
            className="hero-slide"
            style={{ backgroundImage: `url(${hero3})` }}
          >
            <div className="hero-content">
              <h1>Un moment pour vous, un éclat pour votre bien-être</h1>
              <hr className="hero-divider" />
              <p className="hero-subtext">
                Accordez-vous une pause, nous prenons soin de vous.
              </p>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>

    </div>
  );
};

export default Hero;
