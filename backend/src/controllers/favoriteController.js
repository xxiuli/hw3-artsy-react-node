const Favorite = require("../models/Favorites");

/**
 * @desc 获取当前用户的收藏列表
 */
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.userId });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: "Failed to get favorites" });
  }
};

/**
 * @desc 添加收藏
 */
exports.addFavorite = async (req, res) => {
  const { artistId, artistName, imageUrl } = req.body;

  try {
    const favorite = new Favorite({
      userId: req.userId,
      artistId,
      artistName,
      imageUrl,
    });

    await favorite.save();
    res.status(201).json(favorite);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Artist already favorited" });
    }
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
