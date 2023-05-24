import React from "react";
// import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
