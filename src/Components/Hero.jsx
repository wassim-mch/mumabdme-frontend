import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import hero1 from "/assets/hero1.jpg";
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
        speed={900}
        className="hero-swiper"
      >
        {/* SLIDE 1 */}
        <SwiperSlide>
          <div
            className="hero-slide slide-1"
            style={{ backgroundImage: `url(${hero1})` }}
          >
            <div className="hero-content">
              <h1>Bienvenue chez Mum and Me</h1>
              <hr className="hero-divider" />
              <p>
                Un havre de paix dédié à votre bien-être, à celui de votre enfant
                et à la magie du lien qui vous unit.
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 2 */}
        <SwiperSlide>
          <div
            className="hero-slide slide-2"
            style={{ backgroundImage: `url(${hero2})` }}
          >
            <div className="hero-content hero-right">
              <h1>Fatigué ? Besoin d’énergie et d’équilibre ?</h1>
              <hr className="hero-divider" />
              <p>
                Des soins experts, une équipe bienveillante et une prise de
                rendez-vous simple et rapide.
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 3 */}
        <SwiperSlide>
          <div
            className="hero-slide slide-3"
            style={{ backgroundImage: `url(${hero3})` }}
          >
            <div className="hero-content">
              <h1>Une communauté bienveillante pour vos enfants</h1>
              <hr className="hero-divider" />
              <p>
                Des ateliers ludiques, créatifs et éducatifs pour éveiller leur
                curiosité.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;
