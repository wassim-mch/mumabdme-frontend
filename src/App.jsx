import React from "react";
import './index.css'
import { Routes, Route } from "react-router-dom";
/* Components*/
import Header from "./Components/Header";
import Footer from "./Components/Footer";
/* Pages Auth*/
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Card from "./pages/Client/Card";
/* Pages Client*/
import Home from "./pages/Client/Home";
import Services from "./pages/Client/Services";
import About from "./pages/Client/About";
import Contact from "./pages/Client/Contact";
/* Pages Admin*/
function App() {
  return (
    <>
      <Header />
      <main className="flex-grow-1">
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Card*/}
          <Route path="/cart" element={<Card />} />
          {/* Client Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
