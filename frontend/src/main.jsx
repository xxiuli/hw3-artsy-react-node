import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext"; 
import { FavoritesProvider } from "./contexts/FavoritesContext"; // ✅ 引入 Favorites Context
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <AuthProvider>
      <FavoritesProvider> 
        <App />
      </FavoritesProvider>
    </AuthProvider>
  // </StrictMode>
);


