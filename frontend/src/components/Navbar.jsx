import NavbarUI from "./NavbarUI";
import { useAuth } from "../contexts/AuthContext";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../contexts/NotificationContext";


const Navbar = () => {
  const { user, isAuthenticated, setUser } = useAuth();
  const { addNotification } = useNotification();

  console.log("👤 user:", user);
  console.log("🔐 isAuthenticated:", isAuthenticated);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    addNotification("Logged out", "success");
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    try {
      await authService.deleteAccount();
      setUser(null); // 清除用户状态
      addNotification("Account deleted", "danger");
      navigate("/"); // 回首页
    } catch (error) {
      console.error("❌ Delete failed", error);
    }
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
      onAccountDelete={handleDeleteAccount}
    />
  );
};

export default Navbar;
