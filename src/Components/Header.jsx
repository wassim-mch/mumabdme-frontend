<<<<<<< HEAD
import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaInstagram, FaPhone } from "react-icons/fa";
import logo from "/assets/logo.png";

const Header = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showPhones, setShowPhones] = useState(false);
=======
import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "/assets/logo.png"; 
import Button from "./btnconnexion/btncnx";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [cartCount, setCartCount] = useState(0);

  // Charger le cart depuis localStorage
  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.length);
  };

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const handleToggle = () => setIsCollapsed(!isCollapsed);
  const closeMenu = () => setIsCollapsed(false);

<<<<<<< HEAD
  // REF pour fermer en cliquant ailleurs
  const phoneMenuRef = useRef(null);

  // CLICK OUTSIDE pour fermer le menu tel
  useEffect(() => {
    function handleClickOutside(event) {
      if (phoneMenuRef.current && !phoneMenuRef.current.contains(event.target)) {
        setShowPhones(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header>
      {/* TOP HEADER */}
      <div className="top-header d-none d-lg-flex justify-content-center gap-4">
        <span className="texttopbar text-white fw-medium">
          Spa BéBé | Workshop enfant | Duo maman bébé | Relaxation maman | Beauté maman
        </span>
      </div>

=======
  return (
    <header>
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
      {/* MAIN NAVBAR */}
      <nav className="navbar navbar-expand-lg sticky-top">
        <div className="container">

<<<<<<< HEAD
          {/* LOGO */}
=======
          {/* LOGO + TITRE */}
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
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
<<<<<<< HEAD
          <button className="navbar-toggler mx-auto" type="button" onClick={handleToggle}>
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* NAV + ICONES */}
=======
          <button
            className="navbar-toggler mx-auto"
            type="button"
            onClick={handleToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* LINKS + LOGIN + PANIER */}
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
          <div className={`collapse navbar-collapse ${isCollapsed ? "show" : ""}`} id="mainNavbar">

            {/* NAV LINKS */}
            <ul className="navbar-nav mx-auto gap-3 text-center">
              {navLinks.map((link, index) => (
                <li className="nav-item" key={index}>
                  <Link
                    to={link.path}
                    className={`nav-link fw-semibold ${location.pathname === link.path ? "active" : ""}`}
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

<<<<<<< HEAD
            {/* ICONES INSTAGRAM + TELEPHONE */}
            <div className="d-flex align-items-center gap-4 justify-content-center mt-3 mt-lg-0">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/mumandme.dz/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="fs-4 text-dark"
              >
                <FaInstagram />
              </a>

              {/* Téléphone (icone + dropdown) */}
              <div ref={phoneMenuRef} className="position-relative">
                <button
                  className="fs-4 text-dark bg-transparent border-0"
                  onClick={() => setShowPhones(!showPhones)}
                >
                  <FaPhone />
                </button>

                {/* Menu dropdown */}
                {showPhones && (
                  <div
                    className="phone-dropdown position-absolute end-0 mt-2 p-2 rounded shadow"
                    style={{ background: "#fff", zIndex: 1000 }}
                  >
                    <a href="tel:+213770217640" className="dropdown-item">
                      📞 0770 21 76 40
                    </a>
                    <a href="tel:+213770424537" className="dropdown-item">
                      📞 0770 42 45 37
                    </a>
                  </div>
                )}
              </div>

=======
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
                <i className="fa-solid fa-cart-shopping"></i>
                {cartCount > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle" style={{ fontSize: "0.7rem" }}>
                    {cartCount}
                  </span>
                )}
              </Link>
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
