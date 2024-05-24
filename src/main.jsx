import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { registerSW } from "virtual:pwa-register";
import { MapProvider } from "./context/MapContext.jsx";

const updateSW = registerSW({
  onOfflineReady() {},
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MapProvider>
      <App />
    </MapProvider>
  </BrowserRouter>
);
