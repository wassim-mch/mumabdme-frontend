import React from "react";
import "./AboutSection.css"; // import du CSS séparé

const AboutSection = () => {
  return (
    <section className="about-section py-5">
      <div className="container">
        <div className="row align-items-center">

          {/* LEFT SIDE */}
          <div className="col-lg-6 mb-3 mb-lg-3">
            <div className="d-flex align-items-center mb-3 about-left-title">
              <img 
                src="/assets/logo.png" 
                alt="logo"
                className="about-logo me-3"
              />
              <h3 className="fw-bold m-0">À propos de nous</h3>
            </div>

            <p className="text-muted about-description">
              Notre institut Maman & Enfant vous propose un espace dédié au bien-être, 
              aux soins modernes et à l’accompagnement des mamans et des enfants.  
              Avec une équipe experte, des techniques innovantes et une ambiance apaisante,  
              nous offrons des services adaptés à chaque besoin pour un confort optimal.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-6">
            <div className="d-flex about-right-wrapper">

              {/* IMAGES GRID */}
              <div className="row g-2 flex-grow-1">
                <div className="col-6">
                  <img 
                    src="/assets/test.png" 
                    alt="img1" 
                    className="img-fluid rounded about-img"
                  />
                </div>
                <div className="col-6">
                  <img 
                    src="/assets/test.png" 
                    alt="img2" 
                    className="img-fluid rounded about-img"
                  />
                </div>
                <div className="col-6">
                  <img 
                    src="/assets/test.png" 
                    alt="img3" 
                    className="img-fluid rounded about-img"
                  />
                </div>
                <div className="col-6">
                  <img 
                    src="/assets/test.png" 
                    alt="img4" 
                    className="img-fluid rounded about-img"
                  />
                </div>
              </div>

              {/* SEPARATOR BAR */}
              <div className="about-separator d-none d-lg-block"></div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
