import axios from "axios";

const BASE_URL1 = "http://localhost:8080/api"
const BASE_URL = "https://hw3-artsy-react-node-backend-25169468532.us-central1.run.app/api";

const httpService = {
  get: async (endpoint, params = {}, config = {}) => {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        params,
        withCredentials: true, // 如需带 cookie
        ...config,
      });
      console.log(`GET ${BASE_URL}${endpoint} success`);
      return response.data;
    } catch (error) {
      console.error(`GET ${BASE_URL}${endpoint} failed:`, error);
      throw error;
    }
  },

  post: async (endpoint, data = {}, config = {}) => { 
    try {
      console.log("POST to: ", `${BASE_URL}${endpoint}`, "with data:", data);
      const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json", //  明确指定
          ...(config.headers || {}),
        },
        ...config,
      });
      console.log(`Post ${BASE_URL}${endpoint} success`);
      return response.data;
    } catch (error) {
      console.error(`POST ${endpoint} failed:`, error);
      throw error;
    }
  },

  delete: async (endpoint, config = {}) => {
    try {
      const response = await axios.delete(`${BASE_URL}${endpoint}`, {
        withCredentials: true,
        ...config,
      });
      console.log(`DELETE ${BASE_URL}${endpoint} success`);
      return response.data;
    } catch (error) {
      console.error(`DELETE ${BASE_URL}${endpoint} failed:`, error);
      throw error;
    }
  },
};

export default httpService;
