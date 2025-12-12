<<<<<<< HEAD
// src/pages/admin/Services.jsx
import React, { useState, useEffect, useContext } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
=======
import React, { useState, useEffect, useContext } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/api";

const Services = () => {
  const { token } = useContext(AuthContext);
<<<<<<< HEAD
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
  const allDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
=======
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD

  // Modal
=======
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
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
<<<<<<< HEAD
    oldImages: [],
    defaultImage: null,
    defaultImageIndex: 0,
    oldImagesToDelete: [],
  });

  // ------------------ FETCH SERVICES & CATEGORIES ------------------
=======
    defaultImageIndex: 0,
  });

  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
  const allDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
  const fetchServices = async () => {
    try {
      const resServices = await api.get("/services", axiosConfig);
      setServices(resServices.data.services);

      const resCategories = await api.get("/categories", axiosConfig);
      setCategories(resCategories.data.categories || resCategories.data);
<<<<<<< HEAD
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors du chargement des services.");
    } finally {
=======

      setLoading(false);
    } catch (error) {
      console.error(error);
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
      setLoading(false);
    }
  };

<<<<<<< HEAD
  useEffect(() => {
    fetchServices();
  }, [token]);

  // ------------------ MODAL OPEN ------------------
=======
  useEffect(() => { fetchServices(); }, [token]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox" && name === "is_active") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, images: [...form.images, ...Array.from(files)] });
    } else if (type === "checkbox" && name.startsWith("day_")) {
      const day = value;
      const days = form.days.includes(day)
        ? form.days.filter(d => d !== day)
        : [...form.days, day];
      setForm({ ...form, days });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
  const openModal = (service = null) => {
    setEditService(service);

    if (service) {
<<<<<<< HEAD
      const allOldImages = [
        { id: "main", path: `/storage/${service.image}`, isMain: true },
        ...service.galleries.map(g => ({ ...g, isMain: false })),
=======

      const allOldImages = [
        { id: "main", path: `/storage/${service.image}`, isMain: true },
        ...service.galleries.map(g => ({ ...g, isMain: false }))
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
      ];

      setForm({
        category_id: service.category_id || "",
        name: service.name || "",
        description: service.description || "",
        duration: service.duration || "",
        price: service.price || "",
        is_active: service.is_active ?? true,
        days: service.joursDisponibles?.map(d => d.day) || [],
<<<<<<< HEAD
        oldImages: allOldImages,
        images: [],
        defaultImage: `/storage/${service.image}`,
        defaultImageIndex: -1,
        oldImagesToDelete: [],
      });
    } else {
=======

        oldImages: allOldImages,   // ← الآن كل الصور (الرئيسية + gallery)
        images: [],
        defaultImage: `/storage/${service.image}`,   // الصورة الرئيسية الحالية
      });

    } else {

      // NEW service
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
      setForm({
        category_id: "",
        name: "",
        description: "",
        duration: "",
        price: "",
        is_active: true,
        days: [],
<<<<<<< HEAD
        images: [],
        oldImages: [],
        defaultImage: null,
        defaultImageIndex: 0,
        oldImagesToDelete: [],
      });
=======
        oldImages: [],
        images: [],
        defaultImage: null,
      });

>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
    }

    setModalOpen(true);
  };

<<<<<<< HEAD
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
=======


  const closeModal = () => {
    setModalOpen(false);
    setEditService(null);
    setForm({ category_id: "", name: "", description: "", duration: "", price: "", is_active: true, days: [], images: [], defaultImageIndex: 0 });
  };

  const handleImageDelete = (index) => {
    const updatedImages = form.images.filter((_, i) => i !== index);
    const newDefaultIndex = form.defaultImageIndex === index ? 0 : form.defaultImageIndex;
    setForm({ ...form, images: updatedImages, defaultImageIndex: newDefaultIndex });
  };

  const handleSetDefault = (index) => setForm({ ...form, defaultImageIndex: index });

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  // -------------------------------
  // تحديد الصورة الرئيسية الجديدة وتحويل القديمة للـ gallery
  // -------------------------------
  const currentMain = form.oldImages.find(img => img.isMain); // الصورة الحالية
  const newDefaultIsOldImage = form.defaultImageIndex === -1 && form.defaultImage; // صورة قديمة مختارة
  const newDefaultIsNewImage = form.defaultImageIndex >= 0 && form.images[form.defaultImageIndex]; // صورة جديدة مختارة
  let newDefaultPath = ""; // لحفظ الصورة الافتراضية الجديدة إذا كانت قديمة

  if (newDefaultIsNewImage) {
    // الصورة الرئيسية الجديدة من الصور المرفوعة
    formData.append("image", form.images[form.defaultImageIndex]);

    // الصورة القديمة الحالية تتحول للـ gallery إذا كانت موجودة
    if (currentMain) formData.append("old_main_image_to_gallery", currentMain.path);

  } else if (newDefaultIsOldImage) {
    // الصورة الرئيسية الجديدة من الصور القديمة
    formData.append("default_old_image", form.defaultImage);
    newDefaultPath = form.defaultImage;

    // الصورة القديمة الحالية تتحول للـ gallery إذا كانت مختلفة عن الصورة المختارة
    if (currentMain && currentMain.path !== form.defaultImage) {
      formData.append("old_main_image_to_gallery", currentMain.path);
    }
  }

  // -------------------------------
  // إرسال باقي الصور الجديدة (تجنب الصورة الافتراضية الجديدة إذا كانت ضمن الصور الجديدة)
  // -------------------------------
  form.images.forEach((file, i) => {
    if (i !== form.defaultImageIndex) formData.append("images[]", file);
  });

  // -------------------------------
  // حذف الصور القديمة المحددة (تجنب حذف الصورة الافتراضية الجديدة إذا كانت ضمن oldImages)
  // -------------------------------
  if (form.oldImagesToDelete && form.oldImagesToDelete.length > 0) {
    form.oldImagesToDelete.forEach(id => {
      const img = form.oldImages.find(img => img.id === id);
      if (!img || img.path !== newDefaultPath) {
        formData.append("oldImagesToDelete[]", id);
      }
    });
  }

  // -------------------------------
  // الأيام
  // -------------------------------
  form.days.forEach(day => formData.append("days[]", day));

  // -------------------------------
  // بقية البيانات
  // -------------------------------
  ["category_id", "name", "description", "duration", "price", "is_active"]
    .forEach(key => formData.append(key, form[key]));

  // -------------------------------
  // إرسال الطلب
  // -------------------------------
  if (editService) {
    await api.post(`/service/${editService.id}?_method=PUT`, formData, {
      headers: { ...axiosConfig.headers, "Content-Type": "multipart/form-data" },
    });
  } else {
    await api.post("/service", formData, {
      headers: { ...axiosConfig.headers, "Content-Type": "multipart/form-data" },
    });
  }

  fetchServices();
  closeModal();
};





  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce service ?")) return;
    try { await api.delete(`/service/${id}`, axiosConfig); fetchServices(); } 
    catch (error) { console.error(error); toast.error("Erreur lors de la suppression."); }
  };

  const deleteOldImage = async (id) => {
    if (!window.confirm("Supprimer cette image ?")) return;

    try {
      await api.delete(`/gallery/${id}`, axiosConfig);

      setForm({
        ...form,
        oldImages: form.oldImages.filter(img => img.id !== id)
      });

      fetchServices();
    } catch (error) {
      console.error(error);
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
      toast.error("Erreur lors de la suppression.");
    }
  };

<<<<<<< HEAD
  // ------------------ RENDER ------------------
=======
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Services</h2>
<<<<<<< HEAD
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
=======
        <button className="btn btn-primary" onClick={() => openModal()}><FaPlus className="me-1" /> Ajouter</button>
      </div>

      {loading ? <p>Chargement...</p> :
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th><th>Image</th><th>Nom</th><th>Catégorie</th><th>Durée</th><th>Prix</th><th>Statut</th><th>Jours</th><th>Actions</th>
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? services.map(s => (
              <tr key={s.id}>
<<<<<<< HEAD
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
=======
                <td>{s.id}</td><td> <img src={`http://localhost:8000/storage/${s.image}`}  alt="Service" style={{ width: 50, height: 50, objectFit: "cover" }} /></td><td>{s.name}</td><td>{s.category?.name || "-"}</td><td>{s.duration}</td>
                <td>{s.price}</td><td>{s.is_active ? "Actif" : "Inactif"}</td>
                <td>{s.joursDisponibles?.map(d => d.day).join(", ")}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => openModal(s)}><FaEdit /></button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s.id)}><FaTrash /></button>
                </td>
              </tr>
            )) :
              <tr><td colSpan="8" className="text-center">Aucun service trouvé</td></tr>
            }
          </tbody>
        </table>
      }

>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
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

<<<<<<< HEAD
                  {/* Images nouvelles */}
=======
                  {/* Images */}
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
                  <div className="mb-3">
                    <label className="form-label">Images</label>
                    <input type="file" className="form-control mb-2" multiple onChange={handleChange} />
                    <div className="d-flex flex-wrap mt-2">
<<<<<<< HEAD
                      {form.images.map((file, index) => (
=======
                      {Array.from(form.images).map((file, index) => (
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
                        <div key={index} className="me-2 mb-2 text-center" style={{ position: "relative" }}>
                          <img
                            src={URL.createObjectURL(file)}
                            alt="preview"
<<<<<<< HEAD
                            style={{ width: 100, height: 100, objectFit: "cover", border: form.defaultImageIndex === index ? "2px solid green" : "1px solid #ccc" }}
                          />
                          <div className="mt-1">
                            <button type="button" className="btn btn-sm btn-success me-1" onClick={() => handleSetDefault(index)}>Définir comme default</button>
                            <button type="button" className="btn btn-sm btn-danger" onClick={() => handleDeleteNewImage(index)}>Supprimer</button>
=======
                            style={{
                              width: 100,
                              height: 100,
                              objectFit: "cover",
                              border: form.defaultImageIndex === index ? "2px solid green" : "1px solid #ccc"
                            }}
                          />
                          <div className="mt-1">
                            <button type="button" className="btn btn-sm btn-success me-1" onClick={() => handleSetDefault(index)}>Définir comme default</button>
                            <button type="button" className="btn btn-sm btn-danger" onClick={() => handleImageDelete(index)}>Supprimer</button>
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

<<<<<<< HEAD
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

=======
                  <div className="mb-3">
                    <label className="form-label">Anciennes Images</label>
                    <div className="d-flex flex-wrap mt-2">

                      {form.oldImages.map((img) => (
                        <div key={img.id} className="me-2 mb-2 text-center">

                          <img
                            src={`http://localhost:8000${img.path}`}
                            alt="old"
                            style={{
                              width: 100,
                              height: 100,
                              objectFit: "cover",
                              border: form.defaultImage === img.path ? "2px solid green" : "1px solid #ccc"
                            }}
                          />

                          <div className="mt-1">

                            {/* تحديد الصورة كافتراضية */}
                            <button
                              type="button"
                              className="btn btn-sm btn-success me-1"
                              onClick={() => {
                                const updatedOld = form.oldImages.map(img2 => ({
                                  ...img2,
                                  isMain: img2.id === img.id   // هذه الصورة هي الافتراضية الآن
                                }));

                                setForm({
                                  ...form,
                                  oldImages: updatedOld,
                                  defaultImage: img.path,      // ← path الصورة القديمة المختارة
                                  defaultImageIndex: -1        // ← مؤشر سلبي يعني ليست صورة جديدة
                                });
                              }}
                            >
                              Définir comme default
                            </button>



                            {/* حذف الصورة فقط إذا لم تكن الصورة الرئيسية */}
                            {!img.isMain && (
                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteOldImage(img.id)}
                              >
                                Supprimer
                              </button>
                            )}

                          </div>

                        </div>
                      ))}


                    </div>
                  </div>


>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
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
