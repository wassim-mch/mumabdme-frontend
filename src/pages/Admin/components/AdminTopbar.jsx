import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaTools, FaFolderOpen, FaCalendarAlt, FaSignOutAlt, FaBars } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";
import api from "../../../api/api"; // تأكد أنك استوردت api


const AdminTopbar = () => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false); 

  // ← هنا تعريف الدالة بالشكل الصحيح
  const handleLogout = async () => {
    try {
      await api.post("/logout"); 
      logout();
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
    window.location.href = "/login"; // إعادة التوجيه إلى صفحة تسجيل الدخول
  }


  const navLinks = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <FaTachometerAlt style={{ color: "#ffd700" }} />
  },
  {
    name: "Services",
    path: "/admin/services",
    icon: <FaTools style={{ color: "#00e676" }} />
  },
  {
    name: "Categories",
    path: "/admin/categories",
    icon: <FaFolderOpen style={{ color: "#ff9100" }} />
  },
  {
    name: "Appointments",
    path: "/admin/rdv",
    icon: <FaCalendarAlt style={{ color: "#ff5252" }} />
  },
  {
    name: "Profile",
    path: "/admin/profile",
    icon: <FaUsers style={{ color: "#4dd0ff" }} />
  }
];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark admin-topbar">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1 d-flex align-items-center">
  Admin Panel
</span>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setShowMenu(!showMenu)}

        >
          <FaBars style={{ color: "#000000ff", fontSize: "1.5rem" }} />
        </button>
        <div className={`collapse navbar-collapse ${showMenu ? "show" : ""}`} id="adminNavbar">
         <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

            {navLinks.map((link, index) => (
              <li className="nav-item" key={index}>
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
                  onClick={() => setShowMenu(false)}

                >
                  {link.icon} <span className="ms-1">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex mt-2 mt-lg-0">
            <button className="btn btn-danger w-100 w-lg-auto" onClick={handleLogout}>

              <FaSignOutAlt className="me-1" /> Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminTopbar;
