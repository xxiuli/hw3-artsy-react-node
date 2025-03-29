const axios = require("axios");

const BASE_URL = "https://api.artsy.net/api"
// BASE_URL = "https://api.artsy.net/api/v1"

const getArtsyToken = async () => {
    try {
        const endpoint = "/tokens/xapp_token"
        // console.log(BASE_URL+ endpoint)
        const response = await axios.post(BASE_URL+ endpoint, {
            client_id: process.env.ARTSY_CLIENT_ID,
            client_secret: process.env.ARTSY_CLIENT_SECRET
        });
        return response.data.token;
    } catch (error) {
        console.error("❌ Failed to fetch Artsy token", error);
        return null;
    }
};

const getArtist_byId = async (artistId) => {
    try {
        // 4d8b92b34eb68a1b2c0003f4
        const endpoint = `/artists/${artistId}`
        const token = await getArtsyToken();
        if (!token) throw new Error("Artsy API token not available");

        const response = await axios.get(BASE_URL+ endpoint, {
            headers: { "X-Xapp-Token": token }
        });

        return response.data;
    } catch (error) {
        console.error("❌ Failed to fetch artist", error);
        return null;
    }
};

module.exports = { getArtsyToken, getArtist_byId };
