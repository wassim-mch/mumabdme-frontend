import React from "react";
import "./TrustBadges.css";
import { FaShieldAlt, FaHandsHelping, FaHeartbeat, FaSpa } from "react-icons/fa";

const TrustBadges = () => {
  const badges = [
    {
      icon: <FaShieldAlt />,
      title: "Sécurité & Hygiène",
      desc: "Normes strictes adaptées aux mamans et enfants."
    },
    {
      icon: <FaHandsHelping />,
      title: "Accompagnement",
      desc: "Suivi professionnel et bienveillance totale."
    },
    {
      icon: <FaHeartbeat />,
      title: "Experts certifiés",
      desc: "Équipe qualifiée dans le bien-être familial."
    },
    {
      icon: <FaSpa />,
      title: "Bien-être garanti",
      desc: "Ambiance relaxante et soins innovants."
    }
  ];

  return (
    <section className="trust-section py-5">
      <div className="container">
        <div className="row text-center">

          {badges.map((badge, i) => (
            <div key={i} className="col-6 col-md-3 mb-4">
              <div className="trust-badge">
                <div className="trust-icon mb-2">{badge.icon}</div>
                <h6 className="fw-bold trust-title">{badge.title}</h6>
                <p className="text-muted trust-desc">{badge.desc}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
