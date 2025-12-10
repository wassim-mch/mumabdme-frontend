import React from "react";
import { Link } from "react-router-dom";
import service1 from "/assets/test.png";
import service2 from "/assets/test.png";
import service3 from "/assets/test.png";
import "./About.css";

const About = () => {
  return (
    <main>
      {/* HERO SIMPLE */}
      <section className="bg-light py-5 about-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h1 className="display-5 fw-bold">À propos de MomandMe</h1>
              <p className="lead text-muted mb-4">
                Nous sommes une équipe dédiée au bien-être des mamans et des enfants — des soins,
                conseils et expériences pensées avec amour et professionnalisme.
              </p>
              <Link to="/services" className="btn btn-primary btn-lg">
                Découvrir nos services
              </Link>
            </div>
            <div className="col-lg-5 text-center mt-4 mt-lg-0">
              <img
                src="/assets/about-hero.jpg"
                alt="Mom and child"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: 260, objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRESENTATION */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-6">
              <h2 className="h3 mb-3">Présentation</h2>
              <p className="text-muted">
                MomandMe est un espace pensé pour accompagner les mamans et les enfants à chaque étape :
                prévention, soins, bien-être, ateliers et conseils. Notre équipe réunit des professionnels
                certifiés (esthéticiennes, coachs bien-être, spécialistes de la petite enfance).
              </p>
              <ul className="list-unstyled text-muted">
                <li>• Soins sur mesure pour maman</li>
                <li>• Activités et ateliers pour enfants</li>
                <li>• Conseils nutrition & bien-être</li>
              </ul>
            </div>
            <div className="col-md-6">
              <div className="p-4 bg-white rounded shadow-sm">
                <h3 className="h6 text-primary">Nos chiffres clés</h3>
                <div className="row text-center mt-3">
                  <div className="col-4">
                    <h4 className="mb-0">+500</h4>
                    <small className="text-muted">Clients satisfaits</small>
                  </div>
                  <div className="col-4">
                    <h4 className="mb-0">8</h4>
                    <small className="text-muted">Professionnels</small>
                  </div>
                  <div className="col-4">
                    <h4 className="mb-0">4.9</h4>
                    <small className="text-muted">Note moyenne</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION / VISION / VALEURS */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title">Mission</h4>
                  <p className="card-text text-muted">
                    Offrir des services accessibles et sécurisés qui renforcent le bien-être physique et émotionnel
                    des mamans et de leurs enfants.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title">Vision</h4>
                  <p className="card-text text-muted">
                    Être la référence locale en matière de soins familiaux, combinant expertise moderne et attention
                    humaine.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title">Valeurs</h4>
                  <ul className="text-muted mb-0">
                    <li>• Empathie</li>
                    <li>• Sécurité</li>
                    <li>• Professionnalisme</li>
                    <li>• Innovation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS CHOISIR */}
      <section className="py-5">
        <div className="container">
          <h2 className="h3 mb-4">Pourquoi nous choisir ?</h2>

          <div className="row g-3">
            <div className="col-md-6 col-lg-4">
              <div className="d-flex align-items-start gap-3 p-3 border rounded shadow-sm h-100">
                <div className="icon-circle bg-primary text-white d-flex align-items-center justify-content-center">
                  <i className="fa-solid fa-user-doctor fa-lg"></i>
                </div>
                <div>
                  <h5 className="mb-1">Équipe certifiée</h5>
                  <p className="text-muted mb-0">Professionnels formés et expérimentés.</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="d-flex align-items-start gap-3 p-3 border rounded shadow-sm h-100">
                <div className="icon-circle bg-success text-white d-flex align-items-center justify-content-center">
                  <i className="fa-solid fa-hand-holding-heart fa-lg"></i>
                </div>
                <div>
                  <h5 className="mb-1">Approche humaine</h5>
                  <p className="text-muted mb-0">Accompagnement adapté, à l’écoute des besoins.</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="d-flex align-items-start gap-3 p-3 border rounded shadow-sm h-100">
                <div className="icon-circle bg-warning text-white d-flex align-items-center justify-content-center">
                  <i className="fa-solid fa-lightbulb fa-lg"></i>
                </div>
                <div>
                  <h5 className="mb-1">Solutions innovantes</h5>
                  <p className="text-muted mb-0">Des services modernes et personnalisés.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PHARES */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="h3 mb-4">Services phares</h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <img src={service1} className="card-img-top" alt="service 1" />
                <div className="card-body">
                  <h5 className="card-title">Soins post-nataux</h5>
                  <p className="card-text text-muted">Soutien et soins pour maman après l’accouchement.</p>
                  <Link to="/services/soins-post-nataux" className="stretched-link text-decoration-none">En savoir plus</Link>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <img src={service2} className="card-img-top" alt="service 2" />
                <div className="card-body">
                  <h5 className="card-title">Ateliers enfants</h5>
                  <p className="card-text text-muted">Ateliers créatifs et éducatifs pour tout-petits.</p>
                  <Link to="/services/ateliers-enfants" className="stretched-link text-decoration-none">En savoir plus</Link>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <img src={service3} className="card-img-top" alt="service 3" />
                <div className="card-body">
                  <h5 className="card-title">Coaching bien-être</h5>
                  <p className="card-text text-muted">Programmes personnalisés pour retrouver énergie et confiance.</p>
                  <Link to="/services/coaching-bien-etre" className="stretched-link text-decoration-none">En savoir plus</Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-5 text-center">
        <div className="container">
          <h3 className="h4 mb-3">Prête à prendre soin de vous ?</h3>
          <p className="text-muted mb-4">Réservez une séance ou contactez-nous pour une consultation gratuite.</p>
          <Link to="/contact" className="btn btn-outline-primary btn-lg">Contactez-nous</Link>
        </div>
      </section>
    </main>
  );
};

export default About;
