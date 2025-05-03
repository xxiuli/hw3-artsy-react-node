const Favorite = require("../models/Favorites");
const httpService = require("../services/httpService"); // 发请求到 Artsy API 的工具类
const dataProcessor = require("../utils/dataProcessor"); // 如果你已经有清洗逻辑的话

/**
 * @desc 获取当前用户的收藏列表
 */
exports.getFavorites = async (req, res) => {
  console.log("📌 当前用户 ID:", req.userId);

  try {
    const favorites = await Favorite.find({ userId: req.userId });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: "Failed to get favorites" });
  }
};

/**
 * @desc 获取 artist 的详细信息，用于构造 FavoriteArtist（不创建收藏记录）
 * @route GET /api/favorite-artist/:artistId
 */
exports.getFavoriteArtistInfo = async (req, res) => {
  const { artistId } = req.params;

  try {
    const { success, rawData, error } = await httpService.get(`/artists/${artistId}`);
    if (!success) {
      return res.status(500).json({ error: "Failed to fetch artist detail" });
    }

    const cleaned = dataProcessor.cleanFavoriteArtisInfo(rawData);
    return res.json(cleaned);
  } catch (err) {
    console.error("❌ Failed to get favorite artist info:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


/**
 * @desc 添加收藏
 */
exports.addFavorite = async (req, res) => {
 const {artistId} = req.body;

 try {
    // 如果已经收藏了就直接返回提示
    const exists = await Favorite.findOne({ userId: req.userId, artistId });
    if (exists) {
      return res.status(400).json({ error: "Artist already favorited" });
    }
    console.log("Favourite控制器的favotirte端点，获得artistid: ",req.body)
    // 🔁 从 Artsy API 获取 artist detail 数据
    const { success, rawData, error } = await httpService.get(`/artists/${artistId}`);
    if (!success) {
      return res.status(500).json({ error: "Failed to fetch artist detail" });
    }
    console.log("raw:", rawData)
    const clean = dataProcessor.cleanFavoriteArtisInfo(rawData); // 自定义清洗器
    console.log("clean", clean)
    const favorite = new Favorite({
      userId: req.userId,
      artistId: clean.id,
      name: clean.name,
      birthDeathday: clean.birthDeathday,
      nationality: clean.nationality,
      imageUrl: clean.imageUrl,
    });
    // console.log("raw:", rawData)
    console.log("clean", clean)

    await favorite.save();
    // res.status(201).json(favorite);
    console.log("🎯 返回收藏数据:", favorite);
    return res.json(favorite)
  } catch (err) {
    console.error("❌ Add favorite failed:", err);
    res.status(500).json({ error: "Failed to add favorite" });
  }
};

/**
 * @desc 移除收藏
 */
exports.removeFavorite = async (req, res) => {
  const { artistId } = req.params;

  try {
    await Favorite.findOneAndDelete({ userId: req.userId, artistId });
    res.json({ message: "Favorite removed" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove favorite" });
  }
};
