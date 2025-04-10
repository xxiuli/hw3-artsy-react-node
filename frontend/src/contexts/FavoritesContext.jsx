// src/contexts/FavoritesContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import favoriteService from "../services/favoriteService"; // 你可以创建这个模块调用后端 API
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { isAuthenticated } = useAuth();

  // ✅ 页面加载时拉收藏数据
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!isAuthenticated) return;
        const data = await favoriteService.getFavorites(); // 比如 GET /api/favorites
        setFavorites(data || []);
      } catch (err) {
        console.error("❌ 获取收藏失败", err);
        setFavorites([]);
      }
    };
    fetchFavorites();
  }, [isAuthenticated]);

  // ✅ 判断是否收藏
  const isFavorited = (artist) => {
    return favorites.some((f) => f.artistId === artist.id);
  };

  const toggleFavorite = async (artist) => {
    try {
      const exists = isFavorited(artist)

      if (exists) {
        await favoriteService.removeFavorite(artist.id); // DELETE 请求
        setFavorites((prev) => prev.filter((f) => f.artistId !== artist.id));
      } else {
        const newFavorite = await favoriteService.addFavorite(artist.id); // ⭐ 发请求并拿到完整的收藏信息
        setFavorites((prev) => [...prev, newFavorite]); // ✅ 把它添加进去，这样页面才会显示
      }
      // console.log("🎯 当前收藏列表:", favorites.map(f => f.artistId));
    } catch (err) {
      console.error("❌ 更新收藏失败", err);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useFavorites = () => useContext(FavoritesContext);
