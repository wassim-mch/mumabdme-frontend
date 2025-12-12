import React from "react";
import './index.css';
import { Routes, Route, Navigate } from "react-router-dom";

<<<<<<< HEAD
=======
/* Components*/
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
import ProtectedRoute from "./Components/ProtectedRoute";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

<<<<<<< HEAD
import Login from "./pages/Auth/Login";


=======
/* Pages Auth*/
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Cart from "./pages/Client/Cart";

/* Pages Client*/
import Profile from "./pages/Client/Profile";
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
import Home from "./pages/Client/Home";
import Services from "./pages/Client/Services";
import About from "./pages/Client/About";
import Contact from "./pages/Client/Contact";
<<<<<<< HEAD
import ServiceDetails from "./pages/Client/ServiceDetails";


=======

/* Pages Admin*/
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
import AdminLayout from "./pages/Admin/components/AdminLayout";
import Dashboard from "./pages/Admin/AdminDashboard";
import Users from "./pages/Admin/Users";
import AdminServices from "./pages/Admin/Services";
import AdminCategories from "./pages/Admin/Categories";
import AdminRdv from "./pages/Admin/Rdv";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
<<<<<<< HEAD

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};


=======
import ServicePage from "./pages/Client/ServicePage";
import CreerRdv from "./pages/Client/CreerRdv";
import ProfileAdmin from "./pages/Admin/ProfileAdmin";
const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // إذا المستخدم مسجل الدخول
  if (token && user) {
    if (user.role === "client") {
      return <Navigate to="/" replace />; // تحويل للصفحة الرئيسية للعميل
    } else {
      return <Navigate to="/admin/dashboard" replace />; // تحويل للوحة الادمن
    }
  }

  // إذا مش مسجل الدخول => يسمح بالدخول
  return children;
};

>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
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
<<<<<<< HEAD

     <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="rdv" element={<AdminRdv />} />
      </Route>

=======
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />

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
  <Route path="profile-admin" element={<ProfileAdmin />} />
</Route>

      {/* Client Routes — avec Header/Footer */}
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
      <Route
        path="/*"
        element={
          <>
            <Header />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
<<<<<<< HEAD
                <Route path="/services/:id" element={<ServiceDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Home />} />
              
=======
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="creer-rdv" element={<ProtectedRoute role="client"><CreerRdv /></ProtectedRoute>} />
                <Route path="/service/:serviceId" element={<ServicePage />} />
                <Route path="*" element={<Home />} />
                <Route
              path="/profile"
              element={
                <ProtectedRoute role="client">
                  <Profile />
                </ProtectedRoute>
              }
            />
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
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



