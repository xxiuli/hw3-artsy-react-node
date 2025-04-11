// src/controllers/artsyController.js
const httpService = require("../services/httpService");
const dataProcessor = require("../utils/dataProcessor")
/**
 * Search artists by name from Artsy API
 * GET /api/artsy/search?query=xxx
 */
exports.searchArtists = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }
    const searchParam = {
        q: query,
        size: 10,
        type: "artist"
    };

    const { success, rawData, error } = await httpService.get(`/search`, searchParam);

    if (!success) {
        console.error("Error Searching artists:", error);
      return res.status(500).json({ error: "Failed to Search artists" });
      }

    const result = dataProcessor.cleanSearchResult(rawData)
    console.log("Search result:", rawData) 
    console.log("Raw after clean:", result)
    return res.json(result);
    // return res.json(rawData);

  } catch (error) {
    console.error("Error in searchArtists:", error);
    res.status(500).json({ error: "Failed to fetch artist search results" });
  }
};

/**
 * Get artist detail by ID
 * GET /api/artsy/artist/:id
 * 4d8b92b34eb68a1b2c0003f4
 */
exports.getArtistDetail = async (req, res) => {
  try {
    const artistId = req.params.id;
    const { success, rawData, error } = await httpService.get(`/artists/${artistId}`);
    
    if (!success) {
        if (error === "Artist Not Found") {
          return res.status(200).json({}); // ✅ 返回空对象或自定义提示
        }
        return res.status(500).json({ error });
      }

    const result = dataProcessor.cleanArtistDetail(rawData)
    // console.log("Search result:", raw)
    // console.log("Raw after clean:", result)
    // return res.json(rawData);
    return res.json(result);
  } catch (error) {
    console.error("Error in getArtistDetail:", error);
    res.status(500).json({ error: "Failed to fetch artist detail" });
  }
};

/**
 * Get similar artist by ID
 * GET /api/artsy/artist/:id
 * 4d8b92b34eb68a1b2c0003f4
 */
exports.getSimilarArtists = async (req, res) => {
    try {
      const artistId = req.params.id;
      const searchParam = {
        similar_to_artist_id: artistId,
        size: 10,
    };
      const { success, rawData, error } = await httpService.get(`/artists`, searchParam);
      
      if (!success) {
        console.error("Error fetching similar artists:", error);
        return res.status(500).json({ error: "Failed to fetch similar artists" });
      }
      //TODO 这里需要决定如何清洗数据
      const result = dataProcessor.cleanSimilarArtist(rawData)
      console.log("Search result:", rawData)
      // console.log("Raw after clean:", result)
  
      return res.json(result);
      // return res.json(rawData);
      // return res.json({
      //   ...result,
      //   id: artistId,
      // });
    } catch (error) {
      console.error("Error in getSimilarArtist:", error);
      res.status(500).json({ error: "Failed to fetch similar artist detail" });
    }
  };

/**
 * Get artworks of an artist
 * GET /api/artsy/artist/:id/artworks
 * 4d8b928b4eb68a1b2c0001f2
 */
exports.getArtistArtworks = async (req, res) => {
    try {
        const artistId = req.params.id;
        const param = {artist_id: artistId, size: 10}
        // const { success, rawData, error } = await httpService.get(`/artworks/{artistId}`);
        const { success, rawData, error } = await httpService.get(`/artworks`,param);

        
        if (!success) {
          console.error("Error fetching Artwork:", error);
          return res.status(500).json({ error: "Failed to fetch artwork" });
        }
        
        const result = dataProcessor.cleanArtworks(rawData)
        // console.log("Search result:", rawData)
        console.log("Raw after clean:", result)
    
        // return res.json(rawData);
        return res.json(result);
      } catch (error) {
        console.error("Error in artwork:", error);
        res.status(500).json({ error: "Failed to fetch artwork" });
    };
}

/**
 * Get artwork gene categories
 * GET /api/artsy/genes
 */
exports.getGenes = async (req, res) => {
    try {
        const artworkId = req.params.id;
        const param = {artwork_id: artworkId}
        const { success, rawData, error } = await httpService.get(`/genes`, param);
        
        if (!success) {
          console.error("Success but Error fetching Gene:", error);
          if (error === "Artwork Not Found") {
            return res.status(200).json({}); // ✅ 返回空对象或自定义提示
          }
          return res.status(500).json({ error: "Failed to fetch genes" });
        }
        
        //TODO 这里需要决定如何清洗数据
        const result = dataProcessor.cleanGenes(rawData)
        console.log("Search result:", rawData)
        // console.log("Raw after clean:", result)
    
        // return res.json(rawData);
        return res.json(result);
      } catch (error) {
        console.error("Error in gene:", error);
        res.status(500).json({ error: "Failed to fetch gene" });
    };
};
