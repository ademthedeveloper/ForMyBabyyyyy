import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const container = document.getElementById("root");

if (container) {
  // Clear the static loading button once React is ready to take over
  const root = createRoot(container);
  root.render(<App />);
}
