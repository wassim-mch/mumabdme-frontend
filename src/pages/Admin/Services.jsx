// src/pages/admin/Services.jsx
import React, { useState, useEffect, useContext } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [editService, setEditService] = useState(null);

  const [form, setForm] = useState({
    category_id: "",
    sous_categorie_id: "",
    name: "",
    mini_description: "",
    description: "",
    duree: "",
    prix: "",
    days: [],
    images: [],
    oldImages: [],
    defaultImage: null,
    defaultImageIndex: 0,
    oldImagesToDelete: [],
    options: [],
  });

  // ------------------ FETCH SERVICES & CATEGORIES ------------------
  const fetchServices = async () => {
    try {
      const resServices = await api.get("/services", axiosConfig);
      setServices(resServices.data.services || []);

      const resCategories = await api.get("/categories", axiosConfig);
      setCategories(resCategories.data.data || resCategories.data);
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

  // ------------------ MODAL ------------------
  const openModal = (service = null) => {
    setEditService(service);

    if (service) {
      const allOldImages = [
        { id: "main", path: `/storage/${service.image}`, isMain: true },
        ...(service.galleries ?? []).map(g => ({ ...g, isMain: false })),
      ];

      setForm({
        category_id: service.category_id || "",
        sous_categorie_id: service.sous_categorie?.id || "",
        name: service.name || "",
        mini_description: service.mini_description || "",
        description: service.description || "",
        duree: service.duree || "",
        prix: service.prix || "",
        days: service.jours_disponibles?.map(d => d.day) || [],
        oldImages: allOldImages,
        images: [],
        defaultImage: `/storage/${service.image}`,
        defaultImageIndex: -1,
        oldImagesToDelete: [],
        options: service.options?.length > 0 ? service.options : [],
      });
    } else {
      setForm({
        category_id: "",
        sous_categorie_id: "",
        name: "",
        mini_description: "",
        description: "",
        duree: "",
        prix: "",
        days: [],
        images: [],
        oldImages: [],
        defaultImage: null,
        defaultImageIndex: 0,
        oldImagesToDelete: [],
        options: [],
      });
    }

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditService(null);
    setForm({
      category_id: "",
      sous_categorie_id: "",
      name: "",
      mini_description: "",
      description: "",
      duree: "",
      prix: "",
      days: [],
      images: [],
      oldImages: [],
      defaultImage: null,
      defaultImageIndex: 0,
      oldImagesToDelete: [],
      options: [],
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

  // ------------------ OPTIONS ------------------
  const handleOptionChange = (index, field, value) => {
    const newOptions = [...form.options];
    newOptions[index][field] = value;
    setForm(prev => ({ ...prev, options: newOptions }));
  };

  const addOption = () => setForm(prev => ({ ...prev, options: [...prev.options, { name: "", description: "", duration: "", prix_seance: "", abonnement_quatre_seance: "", abonnement_huit_seance: "" }] }));
  const removeOption = (index) => setForm(prev => ({ ...prev, options: prev.options.filter((_, i) => i !== index) }));

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

    try {
      const formData = new FormData();

      // IMAGE PRINCIPALE
      if (form.defaultImageIndex >= 0 && form.images[form.defaultImageIndex]) {
        formData.append("image", form.images[form.defaultImageIndex]);
        const mainOld = form.oldImages.find(img => img.isMain);
        if (mainOld) formData.append("old_main_image_to_gallery", mainOld.path);
      } else if (form.defaultImage) {
          formData.append("default_old_image_id",
            form.oldImages.find(img => img.path === form.defaultImage)?.id
          );        
          const mainOld = form.oldImages.find(img => img.isMain);
          if (mainOld && mainOld.path !== form.defaultImage) {
            formData.append("old_main_image_to_gallery", mainOld.path);
          }
      }

      // IMAGES NOUVELLES
      form.images.forEach((file, i) => {
        if (i !== form.defaultImageIndex) formData.append("images[]", file);
      });

      // SUPPRESSION ANCIENNES IMAGES
      form.oldImagesToDelete.forEach(id => formData.append("oldImagesToDelete[]", id));

      // JOURS
      form.days.forEach(day => formData.append("days[]", day));

      // OPTIONS
      form.options.forEach((opt, i) => {
        Object.keys(opt).forEach(key => {
          formData.append(`options[${i}][${key}]`, opt[key]);
        });
      });

      // AUTRES CHAMPS
      ["category_id", "sous_categorie_id", "name", "mini_description", "description", "duree", "prix", "is_active"]
        .forEach(key => formData.append(key, form[key]));

      // ENVOI API
      if (editService) {
        await api.post(`/services/${editService.id}?_method=PUT`, formData, {
          headers: { ...axiosConfig.headers, "Content-Type": "multipart/form-data" },
        });
        toast.success("Service modifié !");
      } else {
        await api.post("/services", formData, {
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
      await api.delete(`/services/${id}`, axiosConfig);
      toast.success("Service supprimé !");
      fetchServices();
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la suppression.");
    }
  };

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
              <th>Mini Description</th>
              <th>Catégorie</th>
              <th>Sous-Catégorie</th>
              <th>Durée</th>
              <th>Prix</th>
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
                <td>{s.mini_description || "-"}</td>
                <td>{s.categorie?.name || "-"}</td>
                <td>{s.sous_categorie?.name || "-"}</td>
                <td>{s.duree}</td>
                <td>{s.prix}</td>
                <td>{s.jours_disponibles?.map(d => d.day).join(", ")}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => openModal(s)}><FaEdit /></button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteService(s.id)}><FaTrash /></button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="10" className="text-center">Aucun service trouvé</td>
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

                  {/* Sous-catégorie */}
                  <div className="mb-3">
                    <label className="form-label">Sous-Catégorie</label>
                    <select className="form-select" name="sous_categorie_id" value={form.sous_categorie_id} onChange={handleChange}>
                      <option value="">-- Sélectionner --</option>
                      {categories.find(c => c.id === parseInt(form.category_id))?.sous_categories?.map(sc => (
                        <option key={sc.id} value={sc.id}>{sc.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Nom */}
                  <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required/>
                  </div>

                  {/* Mini description */}
                  <div className="mb-3">
                    <label className="form-label">Mini Description</label>
                    <input type="text" className="form-control" name="mini_description" value={form.mini_description} onChange={handleChange}/>
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="description" value={form.description} onChange={handleChange}></textarea>
                  </div>

                  {/* Durée */}
                  <div className="mb-3">
                    <label className="form-label">Durée</label>
                    <input type="number" className="form-control" name="duree" value={form.duree} onChange={handleChange}/>
                  </div>

                  {/* Prix */}
                  <div className="mb-3">
                    <label className="form-label">Prix</label>
                    <input type="number" className="form-control" name="prix" value={form.prix} onChange={handleChange}/>
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

                  {/* Options */}
                  <div className="mb-3">
                    <label className="form-label">Options</label>
                    {form.options.map((opt, index) => (
                      <div key={index} className="border p-2 mb-2">
                        <div className="d-flex align-items-center mb-2">
                          <input className="form-control me-2" placeholder="Nom" value={opt.name} onChange={(e) => handleOptionChange(index, "name", e.target.value)} required/>
                          <input className="form-control me-2" placeholder="Description" value={opt.description} onChange={(e) => handleOptionChange(index, "description", e.target.value)}/>
                          <button type="button" className="btn btn-danger" onClick={() => removeOption(index)}><FaTimes /></button>
                        </div>
                        <div className="d-flex gap-2">
                          <input className="form-control" placeholder="Durée" type="number" value={opt.duree} onChange={(e) => handleOptionChange(index, "duree", e.target.value)} required/>
                          <input className="form-control" placeholder="Prix séance" type="number" value={opt.prix_seance} onChange={(e) => handleOptionChange(index, "prix_seance", e.target.value)} required/>
                          <input className="form-control" placeholder="Abonnement 4 séances" type="number" value={opt.abonnement_quatre_seance} onChange={(e) => handleOptionChange(index, "abonnement_quatre_seance", e.target.value)}/>
                          <input className="form-control" placeholder="Abonnement 8 séances" type="number" value={opt.abonnement_huit_seance} onChange={(e) => handleOptionChange(index, "abonnement_huit_seance", e.target.value)}/>
                        </div>
                      </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={addOption}><FaPlus className="me-1"/> Ajouter Option</button>
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
                            src={`http://localhost:8000/storage/${img.path}`}
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
