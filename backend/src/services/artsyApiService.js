const httpService = require("./httpService");
const dataProcessor = require("../utils/dataProcessor");

const artsyApiService = {
  /**
   * Search artists by name
   * @param {string} query
   * @returns {Array} cleaned artist summaries
   */
  searchArtists: async (query) => {
    const raw = await httpService.get(`/search`, { q: query });
    return dataProcessor.cleanArtistSearchResults(raw);
  },

  /**
   * Get artist detail by ID
   * @param {string} id
   * @returns {Object} cleaned artist detail
   */
  getArtistDetail: async (id) => {
    const raw = await httpService.get(`/artists/${id}`);
    return dataProcessor.cleanArtistDetail(raw);
  },

  /**
   * Get artworks of artist
   * @param {string} id
   * @returns {Array} cleaned artworks
   */
  getArtistArtworks: async (id) => {
    const raw = await httpService.get(`/artists/${id}/artworks`);
    return dataProcessor.cleanArtworks(raw);
  },

  /**
   * Get artwork detail by ID
   * @param {string} id
   * @returns {Object} cleaned artwork
   */
  getArtworkDetail: async (id) => {
    const raw = await httpService.get(`/artworks/${id}`);
    return dataProcessor.cleanArtwork(raw);
  },

  /**
   * Get categories (genes) of an artwork
   * @param {string} id
   * @returns {Array} cleaned gene info
   */
  getArtworkCategories: async (id) => {
    const raw = await httpService.get(`/artworks/${id}/genes`);
    return dataProcessor.cleanGenes(raw);
  },
};

module.exports = artsyApiService;
