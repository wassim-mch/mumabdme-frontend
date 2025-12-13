import React from "react";
import "./AboutSection.css";
import Btnsimple from "../aboutsection/btnsimple/btnsimple"; // 👉 assure-toi du bon chemin

const AboutSection = () => {
  return (
    <section className="about-section py-5">
      <div className="overlay"></div>

      <div className="container position-relative">
        <div className="row align-items-center text-center text-lg-start">

          {/* LEFT SIDE */}
          <div className="col-lg-6 mb-4">
            <h3 className="about-title fw-bold mb-3">À propos de nous</h3>

            <p className="about-description mx-auto mx-lg-0">
              Notre institut Maman & Enfant vous propose un espace dédié au bien-être, 
              aux soins modernes et à l’accompagnement des mamans et enfants.  
              Une équipe experte, des techniques innovantes et une ambiance apaisante 
              pour un confort optimal.
            </p>

            {/* LOGO + TITLE */}
           <div className="d-flex align-items-center about-brand mt-4">
  <img
    src="/assets/logo.png"
    alt="logo"
    className="brand-logo"
  />

  <h1
    className="m-0 brand-title"
    style={{
      fontSize: "1.6rem",
      color: "#826656",
      fontFamily: "Zen Tokyo Zoo",
    }}
  >
    MUM AND ME
  </h1>
</div>

<div className="mt-4 text-center text-lg-start">
  <Btnsimple 
  text="Explorer Plus" 
  to="/about" 
  extraClass="btn-large" 
/>
</div>
          </div>

          {/* RIGHT SIDE IMAGES */}
          <div className="col-lg-6">
            <div className="row g-3">

              <div className="col-6">
                <div className="img-box">
                  <img 
                    src="/assets/img2.jpg"
                    alt="illumaby"
                    className="about-img"
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="img-box">
                  <img 
                    src="/assets/img1.jpg"
                    alt="img1"
                    className="about-img"
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="img-box">
                  <img 
                    src="/assets/img4.jpg"
                    alt="img4"
                    className="about-img"
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="img-box">
                  <img 
                    src="/assets/img3.jpg"
                    alt="illumom"
                    className="about-img"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
