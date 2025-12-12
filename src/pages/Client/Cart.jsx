<<<<<<< HEAD
// src/pages/Client/Cart.jsx
import React, { useState } from "react";
import CartTable from "../../Components/Cart/CartTable";
import BtnSimple from "../../Components/aboutsection/btnsimple/btnsimple";
import DateTimePicker from "../../Components/Cart/DateTimePicker";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const [dateTimeSelected, setDateTimeSelected] = useState(null); // ⚠️ initialisé à null

  // 🔹 Supprimer un item du panier
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // 🔹 Valider la commande
  const handleBtnClick = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      toast.warning("Votre panier est vide !");
      return;
    }

    if (!dateTimeSelected) {
      toast.warning("Veuillez sélectionner une date et une heure !");
      return;
    }

    if (!window.confirm("Voulez-vous vraiment confirmer votre commande ?")) {
      return;
    }

    try {
      // 🔹 Vérification que la date est valide
      let date;
      if (typeof dateTimeSelected === "string") {
        date = new Date(dateTimeSelected);
      } else if (dateTimeSelected instanceof Date) {
        date = dateTimeSelected;
      } else {
        toast.error("Date ou heure invalide !");
        return;
      }

      if (isNaN(date.getTime())) {
        toast.error("Date ou heure invalide !");
        return;
      }

      // 🔹 Formater la date pour Laravel
      const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");

      const payload = {
        scheduled_at: formattedDate,
        items: cartItems.map((item) => ({
          id: item.id,
          price: item.price,
        })),
      };

      const response = await api.post("/rdvs", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Commande validée et enregistrée !");

        // vider panier
        localStorage.removeItem("cart");
        setCartItems([]);

        // redirection
        setTimeout(() => navigate("/services"), 800);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Erreur lors de la création du rendez-vous.");
=======
import React, { useState, useEffect } from "react";
import CartTable from "../../Components/Cart/CartTable";
import BtnSimple from "../../Components/aboutsection/btnsimple/btnsimple";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [dateTimeSelected, setDateTimeSelected] = useState(false);

  // 🔹 useEffect لتحميل الكارت من localStorage عند فتح الصفحة
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemove = (id) => {
    const newCart = cartItems.filter((item) => item.id !== id);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart)); // تحديث التخزين المحلي
    window.dispatchEvent(new Event("cartUpdated"));

  };

  const handleBtnClick = () => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/creer-rdv");
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
    }
  };

  return (
    <>
      <section className="card-hero d-flex flex-column justify-content-center text-center">
        <div className="container">
          <h1 className="hero-title">Passer Votre Commande</h1>
        </div>
      </section>

      <div className="container py-5">
        <CartTable items={cartItems} onRemove={handleRemove} />
<<<<<<< HEAD
        <DateTimePicker onChange={setDateTimeSelected} />
=======

>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
        <div className="text-center mt-4">
          <BtnSimple
            text="Passer à la commande"
            extraClass="btn-large"
<<<<<<< HEAD
            disabled={!dateTimeSelected || cartItems.length === 0}
=======
            disabled={cartItems.length === 0}
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
            onClick={handleBtnClick}
          />
        </div>
      </div>
    </>
  );
};

export default Cart;
