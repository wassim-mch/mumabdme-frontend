import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

/* Bootstrap */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

/* FontAwesome */
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Tooltip } from "bootstrap";
import "./index.css";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthProvider";

// Initialisation des tooltips Bootstrap
document.addEventListener("DOMContentLoaded", function () {
  const tooltipTriggerList = Array.from(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach((tooltipTriggerEl) => {
    new Tooltip(tooltipTriggerEl);
  });
});

// Rendu principal
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
