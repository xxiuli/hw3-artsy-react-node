// src/contexts/FavoritesContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import favoriteService from "../services/favoriteService";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { isAuthenticated } = useAuth();

  //
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!isAuthenticated) return;
        const data = await favoriteService.getFavorites(); 
        setFavorites(data || []);
      } catch (err) {
        console.error("获取收藏失败", err);
        setFavorites([]);
      }
    };
    fetchFavorites();
  }, [isAuthenticated]);

  // 判断是否收藏
  const isFavorited = (artist) => {
    return favorites.some((f) => f.artistId === artist.id);
  };

  const toggleFavorite = async (artist) => {
    try {
      const exists = isFavorited(artist)

      if (exists) {
        await favoriteService.removeFavorite(artist.id); // DELETE 
        setFavorites((prev) => prev.filter((f) => f.artistId !== artist.id));
      } else {
        const newFavorite = await favoriteService.addFavorite(artist.id); // 
        setFavorites((prev) => [...prev, newFavorite]); 
      }
    } catch (err) {
      console.error("更新收藏失败", err);
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
