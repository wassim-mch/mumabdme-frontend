import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaPhoneAlt } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="footer-container pt-5 pb-3">
      <div className="container">
        <div className="row align-items-start">

          {/* Logo + Slogan */}
          <div className="col-md-4 mb-4">
            <img src="/assets/logo.png" alt="Mom&Me Logo" className="footer-logo mb-3" />
            <p className="footer-slogan">
              Un espace d’amour, de bien-être et d’innovation pour vous et vos enfants.
            </p>
          </div>

          {/* Liens */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">Navigation</h5>
            <ul className="footer-links">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/about">À propos</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact + Réseaux */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">Contact</h5>
            <ul className="footer-links">
<<<<<<< HEAD
              <li><FaPhoneAlt /> 0770 21 76 40</li>
              <li><FaPhoneAlt /> 0770 42 45 37</li>
=======
              <li><FaPhoneAlt /> 05 55 55 55 55</li>
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
              <li>
                <a href="https://https://www.instagram.com/mumandme.dz/.com" target="_blank">
                  <FaInstagram /> Instagram
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom text-center mt-4 pt-3">
        <p className="mb-0">
          © {new Date().getFullYear()} Mom&Me — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;