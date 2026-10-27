import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// styles.css self-hosts Inter (Latin subset): no third-party font request.
import "./styles.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
