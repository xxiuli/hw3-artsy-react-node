const express = require("express");
const { getArtist_byId } = require("../services/artsyService.js");

const router = express.Router();
/**
 * @swagger
 * /api/artists/{id}:
 *   get:
 *     summary: Get artist details
 *     description: Fetch details of an artist by their ID from the Artsy API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the artist to fetch.
 *     responses:
 *       200:
 *         description: Artist details successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 birthday:
 *                   type: string
 *                 nationality:
 *                   type: string
 *                 artworks:
 *                   type: string
 *       500:
 *         description: Failed to fetch artist.
 */

router.get("/:id", async (req, res) => {
    const artistId = req.params.id;
    const artist = await getArtist_byId(artistId);

    if (!artist) return res.status(500).json({ error: "Failed to fetch artist" });

    res.json(artist);
});

module.exports = router;
