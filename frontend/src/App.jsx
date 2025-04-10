import { useEffect, useState } from "react"; // ✅ 加上 useState
import { useAuth } from "./contexts/AuthContext";
import authService from "./services/authService";
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from './components/Layout';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./css/App.css"
import ArtistDetailsTabs from "./components/ArtistDetailsTabs";
import Favorites from "./pages/Favorites";

function App() {
  const { setUser } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // ✅ 页面加载时从后端恢复登录状态
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authService.getProfile(); // 会自动带 cookie
        console.log("✅ 自动恢复登录：", user);
        setUser(user);
      } catch (err) {
        console.log("⚠️ 用户未登录或 token 失效");
        setUser(null);
      }
    };

    fetchUser();
  }, [setUser]);

  useEffect(() => {
    const handleClick = (e) => {
      const ripple = document.createElement("div");
      ripple.className = "ripple";

      // 保证它以鼠标点击点为中心展开
      ripple.style.left = `${e.clientX - 5}px`;
      ripple.style.top = `${e.clientY - 5}px`;

      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleToggleFavorite = (artistId) => {
    if (!artistId) return;
    setFavorites((prev) => {
      const exists = prev.find((f) => f.id === artistId);
      if (exists) {
        return prev.filter((f) => f.id !== artistId);
      } else {
        return [...prev, { id: artistId, addedAt: new Date().toISOString() }];
      }
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home favorites={favorites} onToggleFavorite={handleToggleFavorite}/>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="favorites" element={
            <Favorites favorites={favorites} onRemove={handleToggleFavorite} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
