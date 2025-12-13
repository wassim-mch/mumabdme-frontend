import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaInstagram, FaPhone } from "react-icons/fa";
import logo from "/assets/logo.png";

const Header = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showPhones, setShowPhones] = useState(false);

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const handleToggle = () => setIsCollapsed(!isCollapsed);
  const closeMenu = () => setIsCollapsed(false);

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


      {/* MAIN NAVBAR */}
      <nav className="navbar navbar-expand-lg sticky-top">
        <div className="container">

          {/* LOGO */}

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
          <button className="navbar-toggler mx-auto" type="button" onClick={handleToggle}>
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* NAV + ICONES */}

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

            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
