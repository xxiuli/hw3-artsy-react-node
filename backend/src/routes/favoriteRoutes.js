const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");

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
router.get("/", favoriteController.getFavorites);

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
 *             required: [artistId, artistName]
 *             properties:
 *               artistId:
 *                 type: string
 *               artistName:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Artist added to favorites
 *       400:
 *         description: Artist already favorited
 *       500:
 *         description: Failed to add favorite
 */
router.post("/", favoriteController.addFavorite);

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
router.delete("/:artistId", favoriteController.removeFavorite);

module.exports = router;
