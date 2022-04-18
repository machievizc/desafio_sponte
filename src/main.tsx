import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../styles/global.scss";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <div id="root">
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
