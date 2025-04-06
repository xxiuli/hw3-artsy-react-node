import { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import authService from "./services/authService";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from './components/Layout';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./css/App.css"
import ArtistDetailsTabs from "./components/ArtistDetailsTabs";

function App() {
  // const { setUser } = useAuth();

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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="tabs" element={<ArtistDetailsTabs />} />
          {/* 其他路由 */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
