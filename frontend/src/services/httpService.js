import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

const httpService = {
  get: async (endpoint, params = {}) => {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        params,
        withCredentials: true, // 如需带 cookie
      });
      console.log(`GET ${BASE_URL}${endpoint} success`);
      return response.data;
    } catch (error) {
      console.error(`GET ${BASE_URL}${endpoint} failed:`, error);
      throw error;
    }
  },

  post: async (endpoint, data = {}) => {
    try {
      const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
        withCredentials: true,
      });
      console.log(`GET ${BASE_URL}${endpoint} success`);
      return response.data;
    } catch (error) {
      console.error(`POST ${endpoint} failed:`, error);
      throw error;
    }
  },

  // 你可以继续添加 put、delete、upload 等方法
};

export default httpService;
