import React from "react";
import './index.css';
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./Components/ProtectedRoute";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

import Login from "./pages/Auth/Login";


import Home from "./pages/Client/Home";
import Services from "./pages/Client/Services";
import About from "./pages/Client/About";
import Contact from "./pages/Client/Contact";
import ServiceDetails from "./pages/Client/ServiceDetails";


import AdminLayout from "./pages/Admin/components/AdminLayout";
import Dashboard from "./pages/Admin/AdminDashboard";
import AdminServices from "./pages/Admin/Services";
import AdminCategories from "./pages/Admin/Categories";
import AdminRdv from "./pages/Admin/Rdv";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/Client/NotFound";

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};


function App() {
  return (
    <>
    <ToastContainer />
    <Routes>
      {/* Auth Routes */}
      <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

     <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="rdv" element={<AdminRdv />} />
      </Route>

      <Route
        path="/*"
        element={
          <>
            <Header />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:id" element={<ServiceDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              
              </Routes>
            </main>
            <Footer />
          </>
        }
      />
    </Routes>
    </>
  );
}

export default App;



