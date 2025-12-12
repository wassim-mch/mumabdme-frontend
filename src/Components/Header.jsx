import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle ,FaShoppingCart  } from "react-icons/fa";
import logo from "/assets/logo.png"; 
import Button from "./btnconnexion/btncnx";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const handleToggle = () => setIsCollapsed(!isCollapsed);
  const closeMenu = () => setIsCollapsed(false);

  return (
    <header>
      {/* TOP HEADER */}
      <div className="top-header d-none d-lg-flex justify-content-center gap-4">
        <span className="texttopbar text-white fw-medium">
          Spa BéBé | Workshop enfant | Duo maman bébé | Relaxation maman | Beauté maman
        </span>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="navbar navbar-expand-lg sticky-top">
        <div className="container">

          {/* LOGO + TITRE */}
          <Link className="navbar-brand d-flex align-items-center gap-3" to="/">
            <img src={logo} alt="logo" style={{ height: "80px", objectFit: "contain" }} />
            <div className="d-flex flex-column">
              <h1 className="m-0" style={{ fontSize: "1.6rem", color: "#826656", fontFamily: "Zen Tokyo Zoo" }}>
                MUM AND ME
              </h1>
              <small className="text-muted" style={{ fontSize: "0.9rem", fontFamily: "poppins" }}>
                bien-être & innovation
              </small>
            </div>
          </Link>

          {/* TOGGLER MOBILE */}
          <button
            className="navbar-toggler mx-auto"
            type="button"
            onClick={handleToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* LINKS + LOGIN + PANIER */}
          <div className={`collapse navbar-collapse ${isCollapsed ? "show" : ""}`} id="mainNavbar">

            {/* NAV LINKS */}
            <ul className="navbar-nav mx-auto gap-3 text-center">
              {navLinks.map((link, index) => (
                <li className="nav-item" key={index}>
                  <Link
                    to={link.path}
                    className={`nav-link fw-semibold ${location.pathname === link.path ? "active" : ""}`}
                    onClick={closeMenu} // ferme le menu mobile
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* LOGIN / PROFILE + PANIER */}
            <div className="d-flex align-items-center gap-3 justify-content-center mt-3 mt-lg-0">
              {!user ? (
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button>Connexion</Button>
                </Link>
              ) : (
                <div className="position-relative">
                  <button
                    className="btn btn-light rounded-circle fs-4"
                    onClick={() => setShowMenu(!showMenu)}
                  >
                    <FaUserCircle />
                  </button>

                  {showMenu && (
                    <div className="dropdown-menu show position-absolute end-0 mt-2" style={{ minWidth: "150px" }}>
                      <Link to="/profile" className="dropdown-item">Mon profil</Link>
                      <button className="dropdown-item" onClick={logout}>Déconnexion</button>
                    </div>
                  )}
                </div>
              )}

             {/* PANIER */}
<Link to="/cart" className="text-dark fs-4 position-relative">
  <FaShoppingCart />
  <span className=" position-absolute top-0 start-100 translate-middle" style={{ fontSize: "0.9rem" }}>
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
