import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "/assets/logo.png"; 
import Button from "./btnconnexion/btncnx";

const Header = () => {
  const location = useLocation(); // pour savoir le lien actif

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Services", path: "/services" },
    { name: "À propos", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header>

      {/* ===== TOP HEADER ===== */}
      <div className="top-header d-none d-lg-flex justify-content-center gap-4">
        <span className="texttopbar text-white fw-medium " >
           Spa BéBé | Workshop enfant | Duo maman bébé | Relaxation maman | Beauté maman
        </span>
      </div>

      {/* ===== MAIN NAVBAR ===== */}
      <nav className="navbar navbar-expand-lg sticky-top">
        <div className="container">

          {/* LOGO + TITRE */}
          <Link className="navbar-brand d-flex align-items-center gap-3" to="/">
            <img
              src={logo}
              alt="logo"
              style={{ height: "60px", objectFit: "contain" }}
            />
            <div className="d-flex flex-column">
              <h1 className="m-0" style={{ fontSize: "1.5rem", color: "#333", fontFamily: "poppins" }}>
                MumandMe
              </h1>
              <small className="text-muted" style={{ fontSize: "0.85rem" }}>
                bien-être & innovation
              </small>
            </div>
          </Link>

          {/* TOGGLER MOBILE */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* LINKS + BTN + PANIER */}
          <div className="collapse navbar-collapse" id="mainNavbar">

            {/* NAV LINKS */}
            <ul className="navbar-nav mx-auto gap-3 text-center">
              {navLinks.map((link, index) => (
                <li className="nav-item" key={index}>
                  <Link
                    to={link.path}
                    className={`nav-link fw-semibold ${location.pathname === link.path ? "active" : ""}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* RIGHT: LOGIN + PANIER */}
            <div className="d-flex align-items-center gap-3">
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button>Connexion</Button>
              </Link>

              <Link to="/cart" className="text-dark fs-4 position-relative">
                <i className="fa-solid fa-cart-shopping"></i>
                <span
                  className="badge bg-danger position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: "0.7rem" }}
                >
                  0
                </span>
              </Link>
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
