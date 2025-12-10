import React, { useContext, useState } from "react"; // <-- ajout de useState
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaTools, FaFolderOpen, FaCalendarAlt, FaSignOutAlt, FaBars } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";

const AdminTopbar = () => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false); // <-- initialisation du state

  const navLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Services", path: "/admin/services", icon: <FaTools /> },
    { name: "Categories", path: "/admin/categories", icon: <FaFolderOpen /> },
    { name: "Appointments", path: "/admin/rdv", icon: <FaCalendarAlt /> },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark admin-topbar">
      <div className="container-fluid">
        {/* Logo */}
        <span className="navbar-brand mb-0 h1">Admin Panel</span>

        {/* Toggler mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setShowMenu(!showMenu)} // toggle manuel
        >
          <FaBars style={{ color: "#000000ff", fontSize: "1.5rem" }} />
        </button>

        {/* Collapse menu */}
        <div className={`collapse navbar-collapse ${showMenu ? "show" : ""}`} id="adminNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navLinks.map((link, index) => (
              <li className="nav-item" key={index}>
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
                  onClick={() => setShowMenu(false)} // fermeture auto au clic
                >
                  {link.icon} <span className="ms-1">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Déconnexion */}
          <div className="d-flex mt-2 mt-lg-0">
            <button className="btn btn-danger w-100 w-lg-auto" onClick={logout}>
              <FaSignOutAlt className="me-1" /> Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminTopbar;
