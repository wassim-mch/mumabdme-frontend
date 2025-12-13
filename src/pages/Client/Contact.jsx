import React from 'react'
import { FaMapMarkerAlt, FaPhoneAlt,  FaInstagram } from "react-icons/fa";
import './Contact.css'
const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/contact", form);
      alert("Message envoyé avec succès ✅");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      alert("Erreur lors de l'envoi ❌");
    }
  };
  return (
    <div className="contactpage">
        <section className="mapsection">
          <div className="mapwrapper">
            <iframe
              className="mapiframe"
              title="Emplacement VELNORDZ"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.408800556375!2d2.9483655764025034!3d36.736757471272334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128faf88fb6784a7%3A0xfda4407dfe658930!2smum%20and%20me!5e0!3m2!1sfr!2sdz!4v1765327213589!5m2!1sfr!2sdz"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer"
            ></iframe>
          </div>
        </section>

        <section className="contactFormSection">
          <div className="contactContainer">
            <div className="formWrapper">
              <h2>Contactez-nous</h2>
              <hr className="hr" />
              <br />
              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Votre nom"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Votre email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="subject"
                  placeholder="Objet"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />

                <textarea
                  name="message"
                  placeholder="Votre message"
                  rows="6"
                  value={form.message}
                  onChange={handleChange}
                  required
                ></textarea>

                <button type="submit">Envoyer le message</button>
              </form>

            </div>

            <div className="infoWrapper">
              <div className="infoOverlay">
                <h3>Infos de contact</h3>
                <hr className="hr2" />
                <br />
                <p>
                  <strong className="titreinfo">
                    <FaMapMarkerAlt /> Adresse
                  </strong>
                  <br />
                  Numéro 09 groupe 111 sect 07, cite mabrouk, Ouled Fayet 16000
                </p>
                <br />
                <p>
                  <strong className="titreinfo">
                    <FaPhoneAlt /> Téléphone
                  </strong>
                  <br />
                  0770 21 76 40
                </p>
                <br />
                <p>
                  <strong className="titreinfo">
                    <FaInstagram /> Instagram
                  </strong>
                  <br />
                  mumandme.dz
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
  )
}

export default Contact