const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");
const requireAuth = require("../middleware/requireAuth"); // 路径按你实际存放位置调整

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: User's favorite artists management
 */

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Get the current user's favorite artists
 *     tags: [Favorites]
 *     responses:
 *       200:
 *         description: Successfully retrieved favorites
 *       500:
 *         description: Failed to retrieve favorites
 */
router.get("/", requireAuth,　favoriteController.getFavorites);

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Add an artist to favorites
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [artistId, artistName, artistYear, artistNation]
 *             properties:
 *               artistId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Artist added to favorites
 *       400:
 *         description: Artist already favorited or missing fields
 *       500:
 *         description: Failed to add favorite
 */
router.post("/", requireAuth, favoriteController.addFavorite);

/**
 * @swagger
 * /favorites/{artistId}:
 *   delete:
 *     summary: Remove an artist from favorites
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: artistId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully removed favorite
 *       500:
 *         description: Failed to remove favorite
 */
router.delete("/:artistId", requireAuth,favoriteController.removeFavorite);

/**
 * @swagger
 * /favorites/artist-info/{artistId}:
 *   get:
 *     summary: Get full artist info to construct a FavoriteArtist object
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: artistId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the artist to fetch
 *     responses:
 *       200:
 *         description: Successfully retrieved artist info
 *       500:
 *         description: Failed to fetch artist info
 */
router.get("/favorite-artist/:artistId", requireAuth, favoriteController.getFavoriteArtistInfo);

module.exports = router;
