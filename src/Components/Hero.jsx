import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

<<<<<<< HEAD
import hero1 from "/assets/hero1.jpg"; 
=======
import hero1 from "/assets/hero1.jpeg"; 
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
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
<<<<<<< HEAD

        {/* ----- SLIDE 1 : Maman porte bébé ----- */}
=======
        {/* ----- SLIDE 1 ----- */}
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
        <SwiperSlide>
          <div
            className="hero-slide"
            style={{ backgroundImage: `url(${hero1})` }}
          >
            <div className="hero-content">
<<<<<<< HEAD
              <h1>Bienvenue chez Mum and Me</h1>
              <hr className="hero-divider" />
              <p className="hero-subtext">
                Un havre de paix dédié à votre bien-être, à celui de votre enfant et à la magie du lien qui vous unit.
=======
              <h1>Renforcer le lien, vivre la douceur</h1>
              <hr className="hero-divider" />
              <p className="hero-subtext">
                Un espace chaleureux dédié aux mamans et à leurs bébés.
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
              </p>
            </div>
          </div>
        </SwiperSlide>

<<<<<<< HEAD
        {/* ----- SLIDE 2 : Maman soin visage ----- */}
=======
        {/* ----- SLIDE 2 ----- */}
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
        <SwiperSlide>
          <div
            className="hero-slide"
            style={{ backgroundImage: `url(${hero2})` }}
          >
<<<<<<< HEAD
            <div className="hero-content hero-right">
              <h1>Fatigué ? Besoin d’énergie et d’équilibre ?</h1>
              <hr className="hero-divider" />
              <p className="hero-subtext">
                Chez Mum and Me, notre mission est de vous offrir des solutions de bien-être concrètes et adaptées, des soins experts et une prise de rendez-vous en un seul clic.
=======
            <div className="hero-content">
              <h1>La douceur qui prend soin de votre bébé</h1>
              <hr className="hero-divider" />
              <p className="hero-subtext">
                Des soins adaptés pour le bien-être et l'éveil sensoriel.
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
              </p>
            </div>
          </div>
        </SwiperSlide>

<<<<<<< HEAD
        {/* ----- SLIDE 3 : Enfant workshop ----- */}
=======
        {/* ----- SLIDE 3 ----- */}
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
        <SwiperSlide>
          <div
            className="hero-slide"
            style={{ backgroundImage: `url(${hero3})` }}
          >
            <div className="hero-content">
<<<<<<< HEAD
              <h1>Une communauté bienveillante pour vos enfants</h1>
              <hr className="hero-divider" />
              <p className="hero-subtext">
                Des ateliers ludiques, créatifs et éducatifs pour éveiller leur curiosité et renforcer le lien familial.
=======
              <h1>Un moment pour vous, un éclat pour votre bien-être</h1>
              <hr className="hero-divider" />
              <p className="hero-subtext">
                Accordez-vous une pause, nous prenons soin de vous.
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
              </p>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>

    </div>
  );
};

export default Hero;
