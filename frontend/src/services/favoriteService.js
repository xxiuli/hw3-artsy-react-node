// src/services/favoriteService.js
// src/services/favoriteService.js
import httpService from "./httpService";

const baseURL = "/favorites"; // 后端路由已是 /api/favorites

const getFavorites = async () => {
  const res = await httpService.get(baseURL);
  return res; // 返回数组
};

//{ artistId,artistName,artistYear,artistNation,imageUrl}
const addFavorite = async (artistId) => {
  const res = await httpService.post(baseURL, {artistId});
  return res;
};

const removeFavorite = async (artistId) => {
  const res = await httpService.delete(`${baseURL}/${artistId}`);
  return res;
};

export default {
  getFavorites,
  addFavorite,
  removeFavorite,
};

