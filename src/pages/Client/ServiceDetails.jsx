// src/pages/ServiceDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FaClock } from "react-icons/fa";
import api from "../../api/api";
import "./ServiceDetails.css";

const ServiceDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const [serviceData, setServiceData] = useState(null);
  const [otherServices, setOtherServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [selectedOption, setSelectedOption] = useState(location.state?.selectedOption || null);

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    numero_tel: "",
    date_rdv: "",
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/service/${id}`);
        if (!res.data.service) {
          toast.error("Service introuvable");
          setLoading(false);
          return;
        }

        const fixedService = {
          ...res.data.service,
          price: Number(res.data.service.prix),
          duration: res.data.service.duree,
        };

        setServiceData(fixedService);
        setMainImage(`http://localhost:8000/storage/${fixedService.image}`);

        // Autres services
        const resOther = await api.get(`/service?exclude=${id}&limit=4`);
        const fixedOthers = resOther.data.services.map(s => ({
          ...s,
          price: Number(s.prix),
          duration: s.duree
        }));
        setOtherServices(fixedOthers);

      } catch (err) {
        console.error("Erreur chargement service :", err);
        toast.error("Erreur lors du chargement du service");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) return <p className="text-center py-5">Chargement...</p>;
  if (!serviceData) return <p className="text-center py-5 text-danger">Service introuvable</p>;

  const displayedPrice = selectedOption ? selectedOption.prix_seance || 0 : serviceData.price;

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!serviceData) return;

    if (serviceData.options?.length > 0 && !selectedOption) {
      toast.error("Veuillez sélectionner une option avant de réserver !");
      return;
    }

    const payload = {
      service_id: serviceData.id,
      option_id: selectedOption?.id || null,
      nom: form.nom,
      prenom: form.prenom,
      numero_tel: form.numero_tel,
      date_rdv: form.date_rdv,
      statut: "en attente"
    };

    try {
      const res = await api.post("/rdvs", payload);
      toast.success(res.data.message);
      setForm({ nom: "", prenom: "", numero_tel: "", date_rdv: "" });
      setSelectedOption(null);
      console.log("Rdv créé :", res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la réservation !");
    }
  };


  return (
    <div className="container py-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Link to="/services" className="btn btn-outline-secondary mb-4">← Retour aux services</Link>

      <div className="row g-4">
        {/* Image principale + galerie */}
        <div className="col-lg-6">
          <img
            src={mainImage}
            alt={serviceData.name}
            className="img-fluid rounded shadow mb-3 main-image"
            style={{ objectFit: "contain", maxHeight: "400px", width: "100%" }}
          />
          <div className="d-flex flex-wrap gap-2 gallery">
            <img
              key="main-image"
              src={`http://localhost:8000/storage/${serviceData.image}`}
              alt="main"
              className={`gallery-thumb rounded ${mainImage.includes(serviceData.image) ? "active" : ""}`}
              style={{ objectFit: "contain", width: "80px", height: "80px", cursor: "pointer" }}
              onClick={() => setMainImage(`http://localhost:8000/storage/${serviceData.image}`)}
            />
            {serviceData.galleries?.map((img) => (
              <img
                key={img.id}
                src={`http://localhost:8000/storage/${img.path}`}
                alt="gallery"
                className={`gallery-thumb rounded ${mainImage.includes(img.path) ? "active" : ""}`}
                style={{ objectFit: "contain", width: "80px", height: "80px", cursor: "pointer" }}
                onClick={() => setMainImage(`http://localhost:8000/storage/${img.path}`)}
              />
            ))}
          </div>
        </div>

        {/* Infos service */}
        <div className="col-lg-6 d-flex flex-column">
          <h1 className="fw-bold display-5">{serviceData.name}</h1>
          <p className="fs-5 text-muted mb-2">{serviceData.categorie?.name || "Non définie"}</p>
          <p className="text-muted description-text" style={{ minWidth: "200px" }}>{serviceData.description}</p>

          {/* Jours disponibles */}
          <div className="my-3">
            <h5>Jours disponibles :</h5>
            <div className="d-flex flex-wrap gap-2">
              {serviceData.jours_disponibles?.map(j => (
                <span key={j.id} className="day-badge">{j.day}</span>
              ))}
            </div>
          </div>

          {/* Prix */}
          {displayedPrice > 0 && (
            <h2 className="text-success text-center fw-bold my-3">{displayedPrice} DA</h2>
          )}

          {/* Durée */}
          {serviceData.duration > 0 && (
            <p className="text-secondary d-flex align-items-center gap-2">
              <FaClock /> {serviceData.duration} Heure
            </p>
          )}

          {/* Options */}
          {serviceData.options?.length > 0 && (
            <div className="options my-3">
              <h5 style={{ color: "#ff5ea6" }}>Offre :</h5>
              {serviceData.options.map(opt => (
                <div
                  key={opt.id}
                  className={`option-card ${selectedOption?.id === opt.id ? "selected" : ""}`}
                  onClick={() => setSelectedOption(opt)}
                  style={{
                    border: selectedOption?.id === opt.id ? "2px solid #8b4513" : "1px solid #ddd",
                    padding: "10px",
                    borderRadius: "12px",
                    marginBottom: "8px",
                    cursor: "pointer"
                  }}
                >
                  <strong className="d-block">{opt.name}</strong>
                  <strong className="d-block"><FaClock />{opt.duree} Heure</strong>
                  <p className="mb-1">{opt.description}</p>
                  <p className="text-success fw-bold">Prix seance: {Number(opt.prix_seance)} DA</p>
                  <p className="text-success fw-bold">َAbonnement 4 seance : {Number(opt.abonnement_quatre_seance)} DA</p>
                  <p className="text-success fw-bold">Abonnement 8 seance: {Number(opt.abonnement_huit_seance)} DA</p>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Formulaire de réservation */}
      <div className="reservation-form mt-5 p-4 rounded shadow-sm" style={{ border: "2px solid #8b4513" }}>
        <h3 className="mb-4 fw-bold" style={{ color: "#ff5ea6" }}>Réserver ce service</h3>

        {selectedOption && (
          <div className="selected-option mb-3" style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <p><strong>Service :</strong> {serviceData.name}</p>
            <p><strong>Option :</strong> {selectedOption.name}</p>
            <p><strong>Prix :</strong> {displayedPrice} DA</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={form.nom}
            onChange={handleFormChange}
            className="form-input"
            required
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={form.prenom}
            onChange={handleFormChange}
            className="form-input"
            required
          />
          <input
            type="tel"
            name="numero_tel"
            placeholder="Numéro de téléphone"
            value={form.numero_tel}
            onChange={handleFormChange}
            className="form-input"
            required
          />
          <input
            type="datetime-local"
            name="date_rdv"
            value={form.date_rdv}
            onChange={handleFormChange}
            className="form-input"
            required
          />
          <button type="submit" className="btn btn-success fw-bold py-2">Confirmer votre réservation</button>
        </form>
      </div>

      {/* Autres services */}
      {otherServices.length > 0 && (
        <div className="other-services mt-5">
          <h3 className="text-center fw-bold mb-4">Autres services</h3>
          <div className="row g-4">
            {otherServices.map(s => (
              <div key={s.id} className="col-md-3 col-sm-6">
                <div className="card shadow-sm h-100">
                  <img
                    src={`http://localhost:8000/storage/${s.image}`}
                    className="card-img-top"
                    alt={s.name}
                    style={{ objectFit: "contain", height: "150px" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{s.name}</h5>
                    <p className="text-success fw-bold">{s.price} DA</p>
                    <Link to={`/service/${s.id}`} className="btn btn-outline-primary mt-auto">Voir le service</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
