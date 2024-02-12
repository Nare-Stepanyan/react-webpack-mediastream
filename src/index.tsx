import React from "react";
import ReactDom from "react-dom/client";
import App from "./components/app/index";
import "./styles/styles.scss";

const root = ReactDom.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
