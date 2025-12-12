// src/pages/admin/Services.jsx
import React, { useState, useEffect, useContext } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/api";

const Services = () => {
  const { token } = useContext(AuthContext);
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
  const allDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editService, setEditService] = useState(null);
  const [form, setForm] = useState({
    category_id: "",
    name: "",
    description: "",
    duration: "",
    price: "",
    is_active: true,
    days: [],
    images: [],
    oldImages: [],
    defaultImage: null,
    defaultImageIndex: 0,
    oldImagesToDelete: [],
  });

  // ------------------ FETCH SERVICES & CATEGORIES ------------------
  const fetchServices = async () => {
    try {
      const resServices = await api.get("/services", axiosConfig);
      setServices(resServices.data.services);

      const resCategories = await api.get("/categories", axiosConfig);
      setCategories(resCategories.data.categories || resCategories.data);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors du chargement des services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [token]);

  // ------------------ MODAL OPEN ------------------
  const openModal = (service = null) => {
    setEditService(service);

    if (service) {
      const allOldImages = [
        { id: "main", path: `/storage/${service.image}`, isMain: true },
        ...service.galleries.map(g => ({ ...g, isMain: false })),
      ];

      setForm({
        category_id: service.category_id || "",
        name: service.name || "",
        description: service.description || "",
        duration: service.duration || "",
        price: service.price || "",
        is_active: service.is_active ?? true,
        days: service.joursDisponibles?.map(d => d.day) || [],
        oldImages: allOldImages,
        images: [],
        defaultImage: `/storage/${service.image}`,
        defaultImageIndex: -1,
        oldImagesToDelete: [],
      });
    } else {
      setForm({
        category_id: "",
        name: "",
        description: "",
        duration: "",
        price: "",
        is_active: true,
        days: [],
        images: [],
        oldImages: [],
        defaultImage: null,
        defaultImageIndex: 0,
        oldImagesToDelete: [],
      });
    }

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditService(null);
    setForm({
      category_id: "",
      name: "",
      description: "",
      duration: "",
      price: "",
      is_active: true,
      days: [],
      images: [],
      oldImages: [],
      defaultImage: null,
      defaultImageIndex: 0,
      oldImagesToDelete: [],
    });
  };

  // ------------------ FORM CHANGE ------------------
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox" && name === "is_active") {
      setForm(prev => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setForm(prev => ({ ...prev, images: [...prev.images, ...Array.from(files)] }));
    } else if (type === "checkbox" && name.startsWith("day_")) {
      const day = value;
      setForm(prev => ({
        ...prev,
        days: prev.days.includes(day) ? prev.days.filter(d => d !== day) : [...prev.days, day],
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // ------------------ IMAGE HANDLERS ------------------
  const handleSetDefault = (index) => setForm(prev => ({ ...prev, defaultImageIndex: index, defaultImage: null }));
  const handleDeleteNewImage = (index) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      defaultImageIndex: prev.defaultImageIndex === index ? 0 : prev.defaultImageIndex,
    }));
  };
  const handleSetOldDefault = (imgPath) => {
    setForm(prev => ({
      ...prev,
      oldImages: prev.oldImages.map(img => ({ ...img, isMain: img.path === imgPath })),
      defaultImage: imgPath,
      defaultImageIndex: -1,
    }));
  };
  const handleDeleteOldImage = (id) => {
    setForm(prev => ({
      ...prev,
      oldImages: prev.oldImages.filter(img => img.id !== id),
      oldImagesToDelete: [...prev.oldImagesToDelete, id],
    }));
  };

  // ------------------ SUBMIT ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Gestion image principale
    if (form.defaultImageIndex >= 0) {
      formData.append("image", form.images[form.defaultImageIndex]);
      if (form.oldImages.some(img => img.isMain)) {
        const mainOld = form.oldImages.find(img => img.isMain);
        formData.append("old_main_image_to_gallery", mainOld.path);
      }
    } else if (form.defaultImage) {
      formData.append("default_old_image", form.defaultImage);
      const mainOld = form.oldImages.find(img => img.isMain);
      if (mainOld && mainOld.path !== form.defaultImage) formData.append("old_main_image_to_gallery", mainOld.path);
    }

    // Ajouter images nouvelles sauf celle par défaut
    form.images.forEach((file, i) => {
      if (i !== form.defaultImageIndex) formData.append("images[]", file);
    });

    // Supprimer images anciennes
    form.oldImagesToDelete.forEach(id => formData.append("oldImagesToDelete[]", id));

    // Ajouter jours
    form.days.forEach(day => formData.append("days[]", day));

    // Ajouter autres champs
    ["category_id", "name", "description", "duration", "price", "is_active"].forEach(key => formData.append(key, form[key]));

    try {
      if (editService) {
        await api.post(`/service/${editService.id}?_method=PUT`, formData, {
          headers: { ...axiosConfig.headers, "Content-Type": "multipart/form-data" },
        });
        toast.success("Service modifié !");
      } else {
        await api.post("/service", formData, {
          headers: { ...axiosConfig.headers, "Content-Type": "multipart/form-data" },
        });
        toast.success("Service ajouté !");
      }
      fetchServices();
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'enregistrement.");
    }
  };

  // ------------------ DELETE SERVICE ------------------
  const handleDeleteService = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce service ?")) return;
    try {
      await api.delete(`/service/${id}`, axiosConfig);
      toast.success("Service supprimé !");
      fetchServices();
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la suppression.");
    }
  };

  // ------------------ RENDER ------------------
  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Services</h2>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <FaPlus className="me-1" /> Ajouter
        </button>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Durée</th>
              <th>Prix</th>
              <th>Statut</th>
              <th>Jours</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? services.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>
                  <img src={`http://localhost:8000/storage/${s.image}`} alt="Service" style={{ width: 50, height: 50, objectFit: "cover" }} />
                </td>
                <td>{s.name}</td>
                <td>{s.category?.name || "-"}</td>
                <td>{s.duration}</td>
                <td>{s.price}</td>
                <td>{s.is_active ? "Actif" : "Inactif"}</td>
                <td>{s.joursDisponibles?.map(d => d.day).join(", ")}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => openModal(s)}><FaEdit /></button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteService(s.id)}><FaTrash /></button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="9" className="text-center">Aucun service trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* MODAL */}
      {modalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">{editService ? "Modifier Service" : "Ajouter Service"}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  {/* Catégorie */}
                  <div className="mb-3">
                    <label className="form-label">Catégorie</label>
                    <select className="form-select" name="category_id" value={form.category_id} onChange={handleChange} required>
                      <option value="">-- Sélectionner --</option>
                      {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                  </div>

                  {/* Nom */}
                  <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required/>
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="description" value={form.description} onChange={handleChange}></textarea>
                  </div>

                  {/* Durée */}
                  <div className="mb-3">
                    <label className="form-label">Durée</label>
                    <input type="text" className="form-control" name="duration" value={form.duration} onChange={handleChange}/>
                  </div>

                  {/* Prix */}
                  <div className="mb-3">
                    <label className="form-label">Prix</label>
                    <input type="number" className="form-control" name="price" value={form.price} onChange={handleChange}/>
                  </div>

                  {/* Statut */}
                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange}/>
                    <label className="form-check-label">Actif</label>
                  </div>

                  {/* Jours */}
                  <div className="mb-3">
                    <label className="form-label">Jours Disponibles</label>
                    <div className="d-flex flex-wrap">
                      {allDays.map(day => (
                        <div key={day} className="form-check me-3">
                          <input type="checkbox" className="form-check-input" id={`day_${day}`} name={`day_${day}`} value={day} checked={form.days.includes(day)} onChange={handleChange}/>
                          <label className="form-check-label" htmlFor={`day_${day}`}>{day}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Images nouvelles */}
                  <div className="mb-3">
                    <label className="form-label">Images</label>
                    <input type="file" className="form-control mb-2" multiple onChange={handleChange} />
                    <div className="d-flex flex-wrap mt-2">
                      {form.images.map((file, index) => (
                        <div key={index} className="me-2 mb-2 text-center" style={{ position: "relative" }}>
                          <img
                            src={URL.createObjectURL(file)}
                            alt="preview"
                            style={{ width: 100, height: 100, objectFit: "cover", border: form.defaultImageIndex === index ? "2px solid green" : "1px solid #ccc" }}
                          />
                          <div className="mt-1">
                            <button type="button" className="btn btn-sm btn-success me-1" onClick={() => handleSetDefault(index)}>Définir comme default</button>
                            <button type="button" className="btn btn-sm btn-danger" onClick={() => handleDeleteNewImage(index)}>Supprimer</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Anciennes images */}
                  <div className="mb-3">
                    <label className="form-label">Anciennes Images</label>
                    <div className="d-flex flex-wrap mt-2">
                      {form.oldImages.map(img => (
                        <div key={img.id} className="me-2 mb-2 text-center">
                          <img
                            src={`http://localhost:8000${img.path}`}
                            alt="old"
                            style={{ width: 100, height: 100, objectFit: "cover", border: form.defaultImage === img.path ? "2px solid green" : "1px solid #ccc" }}
                          />
                          <div className="mt-1">
                            <button type="button" className="btn btn-sm btn-success me-1" onClick={() => handleSetOldDefault(img.path)}>Définir comme default</button>
                            {!img.isMain && <button type="button" className="btn btn-sm btn-danger" onClick={() => handleDeleteOldImage(img.id)}>Supprimer</button>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Annuler</button>
                  <button type="submit" className="btn btn-primary">{editService ? "Modifier" : "Ajouter"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
