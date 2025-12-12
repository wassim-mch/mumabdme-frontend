import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";

const CreerRdv = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [scheduledAt, setScheduledAt] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 تحميل الكارت من localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // 🔹 دالة إنشاء RDV
  const handleCreateRdv = async () => {
    if (cartItems.length === 0) {
      toast.error("Votre panier est vide !");
      return;
    }
    if (!scheduledAt) {
      toast.error("Veuillez sélectionner une date et une heure !");
      return;
    }
    console.log("Creating RDV with items:", cartItems, "at", scheduledAt);
    setLoading(true);
    try {
      const response = await api.post("/rdvs", {
        items: cartItems,
        scheduled_at: scheduledAt,
        status: "en attente",
      });

      if (response.data.status === 200) {
        toast.success("Rdv créé avec succès !");
        localStorage.removeItem("cart"); // تفريغ الكارت بعد الانشاء
        window.dispatchEvent(new Event("cartUpdated")); // لتحديث أي كومبوننت يستخدم الكارت
        navigate("/"); // رجوع للصفحة الرئيسية أو أي صفحة أخرى
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Erreur lors de la création du Rdv"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Créer un RDV</h1>

      <div className="mb-3">
        <label htmlFor="datetime" className="form-label">
          Choisissez la date et l'heure
        </label>
        <input
          type="datetime-local"
          id="datetime"
          className="form-control"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
        />
      </div>

      <h3 className="mt-4">Votre Panier</h3>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <ul className="list-group mb-4">
          {cartItems.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between">
              {item.name} - {item.price}€
            </li>
          ))}
        </ul>
      )}

      <div className="text-center">
        <button
          className="btn btn-primary btn-lg"
          onClick={handleCreateRdv}
          disabled={loading || cartItems.length === 0}
        >
          {loading ? "Création..." : "Créer RDV"}
        </button>
      </div>
    </div>
  );
};

export default CreerRdv;
