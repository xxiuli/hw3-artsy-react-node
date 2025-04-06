import NavbarUI from "./NavbarUI";
import { useAuth } from "../contexts/AuthContext";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, isAuthenticated, setUser } = useAuth();
  console.log("👤 user:", user);
  console.log("🔐 isAuthenticated:", isAuthenticated);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    navigate("/");
  };

  const headTitle = "Artist Search";

  const navLinks = isAuthenticated
    ? [
        { path: "/", label: "Search" },
        { path: "/favorites", label: "Favorites" },
        // { path: "/profile", label: "Profile" },
      ]
    : [
        { path: "/", label: "Search" },
        { path: "/login", label: "Login" },
        { path: "/register", label: "Register" },
      ];

  // if (user === undefined) return null;

  return (
    <NavbarUI
      headTitle={headTitle}
      navLinks={navLinks}
      user={user}
      isAuthenticated={isAuthenticated}
      onLogout={handleLogout}
    />
  );
};

export default Navbar;
