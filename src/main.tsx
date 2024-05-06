import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import App from "./views";
import "react-toggle/style.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
