import React from "react";
import "./About.css";
import Btnsimple from "../../Components/aboutsection/btnsimple/btnsimple";
import { FaBaby, FaHeart, FaSpa, FaUserNurse } from "react-icons/fa";

const About = () => {
  return (
    <div className="about-page">

      {/* 🔵 SECTION HERO */}
      <section className="about-hero d-flex flex-column justify-content-center text-center">
        <div className="container">
          <h1 className="hero-title">À Propos de Nous</h1>
        </div>
      </section>

      {/* 🔵 PRÉSENTATION */}
      <section className="about-presentation py-5">
        <div className="container">
          <div className="row align-items-center">

            {/* TEXT */}
            <div className="col-lg-6 mb-4">
              <h2 className="section-title">Qui sommes-nous ?</h2>
              <p className="section-text">
               Nous sommes un institut entièrement dédié au bien-être de la maman et de l’enfant.
Notre mission est d’offrir un espace chaleureux, apaisant et pensé pour accompagner chaque famille à chaque étape.
Grâce à des soins modernes, des techniques professionnelles et une approche humaine, nous créons une expérience unique où détente, confort et accompagnement personnalisé se rencontrent.
Chez nous, chaque maman, chaque bébé et chaque future maman trouve un lieu de confiance pour se ressourcer, se rééquilibrer et vivre pleinement ce moment précieux
              </p>
            </div>

            {/* IMAGES DROITE */}
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6">
                  <img src="/assets/enftjoue.jpg" className="img-fluid rounded shadow-sm" />
                </div>
                <div className="col-6">
                  <img src="/assets/img5.jpg" className="img-fluid rounded shadow-sm" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🔵 CHIFFRES CLÉS */}
      <section className="about-stats text-center py-5">
        <div className="overlay"></div>
        <div className="container position-relative">
          <div className="row text-white">

            <div className="col-6 col-md-3 mb-4">
              <h2 className="stat-number">500+</h2>
              <p className="stat-label">Clients Satisfaits</p>
            </div>

            <div className="col-6 col-md-3 mb-4">
              <h2 className="stat-number">25+</h2>
              <p className="stat-label">Professionnels</p>
            </div>

            <div className="col-6 col-md-3 mb-4">
              <h2 className="stat-number">4.8/5</h2>
              <p className="stat-label">Note Moyenne</p>
            </div>

            <div className="col-6 col-md-3 mb-4">
              <h2 className="stat-number">100%</h2>
              <p className="stat-label">Accompagnement</p>
            </div>

          </div>
        </div>
      </section>

      {/* 🔵 NOTRE MISSION */}
      <section className="about-mission py-5">
        <div className="container text-center">
          <h2 className="section-title">Notre Mission</h2>
          <p className="section-text mx-auto w-75">
            Offrir un environnement sécurisé, chaleureux et professionnel
            à toutes les mamans et enfants, avec des soins modernes et adaptés.
          </p>

          {/* CARDS */}
<div className="row mt-4 g-4">

  <div className="col-md-4">
    <div className="mission-card shadow-sm text-center">
      <FaUserNurse className="card-img-top" size={60} color="#f48fb1" />
      <h4 className="mission-title">Accompagnement</h4>
      <p className="mission-text">Un suivi adapté à chaque besoin.</p>
    </div>
  </div>

  <div className="col-md-4">
    <div className="mission-card shadow-sm text-center">
      <FaSpa className="card-img-top" size={60} color="#f48fb1" />
      <h4 className="mission-title">Bien-être</h4>
      <p className="mission-text">Un espace zen et relaxant.</p>
    </div>
  </div>

  <div className="col-md-4">
    <div className="mission-card shadow-sm text-center">
      <FaBaby className="card-img-top" size={60} color="#f48fb1" />
      <h4 className="mission-title">Professionnalisme</h4>
      <p className="mission-text">Une équipe qualifiée à votre service.</p>
    </div>
  </div>

</div>
        </div>
      </section>

      {/* 🔵 POURQUOI NOUS CHOISIR */}
      <section className="about-choose py-5">
        <div className="container">

          <h2 className="section-title text-center text-black">Pourquoi Nous Choisir ?</h2>

          <div className="row text-center text-white mt-4 g-4">

            <div className="col-md-4">
              <i className="bi bi-heart-fill choose-icon"></i>
              <h5 className="choose-title">Bienveillance</h5>
              <p className="choose-text">Un accueil chaleureux et humain.</p>
            </div>

            <div className="col-md-4">
              <i className="bi bi-person-check-fill choose-icon"></i>
              <h5 className="choose-title">Expertise</h5>
              <p className="choose-text">Une équipe formée et expérimentée.</p>
            </div>

            <div className="col-md-4">
              <i className="bi bi-stars choose-icon"></i>
              <h5 className="choose-title">Qualité</h5>
              <p className="choose-text">Services professionnels certifiés.</p>
            </div>

          </div>

        </div>
      </section>

     {/* 🔵 SERVICES PHARES */}
<section className="about-services py-5">
  <div className="container">
    <h2 className="section-title text-center">Nos Services Phares</h2>

    <div className="row g-4 mt-4">

      <div className="col-md-4">
        <div className="service-card shadow-sm">
          <img src="/assets/Babyspa.jpg" className="card-img-top" />
          <h4 className="service-title">Baby Spa</h4>
          <p className="service-text">Moments de détente et de relaxation pour bébé.</p>
        </div>
      </div>

      <div className="col-md-4">
        <div className="service-card shadow-sm">
          <img src="/assets/Workshop enfant.jpg" className="card-img-top" />
          <h4 className="service-title">Ateliers éducatifs</h4>
          <p className="service-text">Activités ludiques pour le développement et l’apprentissage de l’enfant.</p>
        </div>
      </div>

      <div className="col-md-4">
        <div className="service-card shadow-sm">
          <img src="/assets/Espace bauté englerie esthetique.jpg" className="card-img-top" />
          <h4 className="service-title">Soins maman</h4>
          <p className="service-text">Beauté et bien-être avec des soins professionnels pour maman.</p>
        </div>
      </div>

    </div>

          <div className="text-center mt-4">
            <Btnsimple text="Découvrez Nos Services" to="/services" extraClass="btn-large" />
          </div>
        </div>
      </section>

      {/* 🔵 SECTION FINAL CTA */}
      <section className="about-final text-center py-5">
        <div className="container">
          <h2 className="final-title">Une question ? Nous sommes là pour vous.</h2>
          <p className="final-text">Contactez-nous pour plus d’informations.</p>
          <Btnsimple text="Contactez-nous" to="/contact" extraClass="btn-large" />
        </div>
      </section>

    </div>
  );
};

export default About;
