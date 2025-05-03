import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext"; 
import { FavoritesProvider } from "./contexts/FavoritesContext"; 
import "bootstrap/dist/css/bootstrap.min.css";
import { NotificationProvider } from "./contexts/NotificationContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <NotificationProvider>
    <AuthProvider>
      <FavoritesProvider> 
        <App />
      </FavoritesProvider>
    </AuthProvider>
  </NotificationProvider>
  // </StrictMode>
);


