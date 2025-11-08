import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/auth.tsx";
import { ColorModeProvider } from "./contexts/theme.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorModeProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ColorModeProvider>
  </StrictMode>
);
