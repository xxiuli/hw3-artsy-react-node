const axios = require("axios");

let cachedToken = null;
let tokenExpiry = null;

const getArtsyToken = async () => {
  const now = Date.now();

  // 如果 token 有效，则复用
  if (cachedToken && tokenExpiry && now < tokenExpiry) {
    return cachedToken;
  }

  try {
    const res = await axios.post("https://api.artsy.net/api/tokens/xapp_token", {
      client_id: process.env.ARTSY_CLIENT_ID,
      client_secret: process.env.ARTSY_CLIENT_SECRET,
    });

    cachedToken = res.data.token;
    tokenExpiry = new Date(res.data.expires_at).getTime();
    return cachedToken;
  } catch (error) {
    console.error("❌ Failed to fetch Artsy token", error.response?.data || error.message);
    return null;
  }
};

module.exports = getArtsyToken;
