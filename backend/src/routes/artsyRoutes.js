const express = require("express");
const artsyController = require("../controllers/artsyController");

const router = express.Router();

/**
 * @swagger
 * /artsy/search:
 *   get:
 *     summary: Search artists by name
 *     tags:
 *       - Artsy
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of matching artists
 */
router.get("/search", artsyController.searchArtists);

/**
 * @swagger
 * /artsy/artists/{id}:
 *   get:
 *     summary: Get detailed artist information
 *     tags:
 *       - Artsy
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Artist detail
 */
router.get("/artists/:id", artsyController.getArtistDetail);

/**
 * @swagger
 * /artsy/artists/{id}/similar:
 *   get:
 *     summary: Get similar artist information
 *     tags:
 *       - Artsy
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Similar Artists
 *       400:
 *         description: Invalid artist ID
 *       500:
 *         description: Internal server error
 */
router.get("/artists/:id/similar", artsyController.getSimilarArtists);

/**
 * @swagger
 * /artsy/artworks/{id}:
 *   get:
 *     summary: Get artworks of an artist
 *     tags:
 *       - Artsy
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of artworks
 */
router.get("/artworks/:id", artsyController.getArtistArtworks);

/**
 * @swagger
 * /artsy/genes/{id}:
 *   get:
 *     summary: Get categories (genes) for an artwork
 *     tags:
 *       - Artsy
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of artwork categories
 */
router.get("/genes/:id", artsyController.getGenes);

module.exports = router;

