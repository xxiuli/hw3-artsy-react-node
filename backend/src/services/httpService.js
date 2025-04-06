const axios = require("axios");
const getArtsyToken = require("./tokenManager");

const BASE_URL = "https://api.artsy.net/api";

const httpService = {
  get: async (endpoint, params = {}) => {
    try {
      const token = await getArtsyToken();
      // console.log("🔐 Token:", token);
      // console.log("URL is: ", `${BASE_URL}${endpoint}`)
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        params,
        headers: {
          "X-Xapp-Token": token,
        },
      });
      return { success: true, rawData: response.data };
    } catch (error) {
        const errorMessage = extractErrorMessage(error);
        return {
        success: false,
        error: errorMessage,
        };
    }
  },

  post: async (endpoint, data = {}) => {
    try {
      const token = await getArtsyToken();
      const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
        headers: {
          "X-Xapp-Token": token,
        },
      });
      return {
        success: true,
        data: response.rawData,
      };

    } catch (error) {
        const errorMessage = extractErrorMessage(error);
        return {
        success: false,
        error: errorMessage,
        };
    }
  },
};

const extractErrorMessage = (error) => {
    if (error.response && error.response.data && typeof error.response.data === "object") {
      // artsy 返回的一般是这种结构：{ type: "other_error", message: "Artist Not Found" }
      console.log("ERROR IN HTTP");
      return error.response.data.message || "Unknown Error";
    } else if (error.message) {
      console.log("ERROR IN HTTP");
      return error.message;
    } else {
      console.log("ERROR IN HTTP");
      return "Unknown error occurred during HTTP request.";
    }
  };

module.exports = httpService;
