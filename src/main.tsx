import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GarbageContextAPI } from "./context/GarbageContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GarbageContextAPI.Provider>
      <App />
    </GarbageContextAPI.Provider>
  </StrictMode>
);
