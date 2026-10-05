import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { prepareFamilyStorage } from "./data";
import "./styles.css";
import "./refinement.css";
import "./mission-lab.css";
import "./launch.css";
import "./brand.css";

prepareFamilyStorage();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
