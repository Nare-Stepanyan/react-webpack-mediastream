import React from "react";
import { Provider } from "react-redux";
import ReactDom from "react-dom/client";
import App from "./components/app/index";
import { store } from "./store";
import "./styles/styles.scss";

const root = ReactDom.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
