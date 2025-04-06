const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    artistId: {
      type: String,
      required: true,
    },
    artistName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// 每个用户只能收藏一个 artist 一次
favoriteSchema.index({ userId: 1, artistId: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", favoriteSchema);
