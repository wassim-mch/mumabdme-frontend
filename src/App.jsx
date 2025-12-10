import React from "react";
import './index.css';
import { Routes, Route } from "react-router-dom";

/* Components*/
import ProtectedRoute from "./Components/ProtectedRoute";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

/* Pages Auth*/
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Card from "./pages/Client/Card";

/* Pages Client*/
import Profile from "./pages/Client/Profile";
import Home from "./pages/Client/Home";
import Services from "./pages/Client/Services";
import About from "./pages/Client/About";
import Contact from "./pages/Client/Contact";

/* Pages Admin*/
import AdminLayout from "./pages/Admin/components/AdminLayout";
import Dashboard from "./pages/Admin/AdminDashboard";
import Users from "./pages/Admin/Users";
import AdminServices from "./pages/Admin/Services";
import AdminCategories from "./pages/Admin/Categories";
import AdminRdv from "./pages/Admin/Rdv";


function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Routes — pas de Header/Footer */}
     <Route
  path="/admin"
  element={
    <ProtectedRoute role="superadmin">
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="users" element={<Users />} />
  <Route path="services" element={<AdminServices />} />
  <Route path="categories" element={<AdminCategories />} />
  <Route path="rdv" element={<AdminRdv />} />
</Route>

      {/* Client Routes — avec Header/Footer */}
      <Route
        path="/*"
        element={
          <>
            <Header />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Card />} />
                <Route path="*" element={<Home />} />
                <Route
              path="/profile"
              element={
                <ProtectedRoute role="client">
                  <Profile />
                </ProtectedRoute>
              }
            />
              </Routes>
            </main>
            <Footer />
          </>
        }
      />
    </Routes>
  );
}

export default App;



