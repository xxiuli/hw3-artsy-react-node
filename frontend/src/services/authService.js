import httpService from "./httpService";

const authService = {
  login: (data) => httpService.post("/auth/login", data, { withCredentials: true }),
  register: (data) => httpService.post("/auth/register", data),
  logout: () => httpService.post("/auth/logout", {}, { withCredentials: true }),
  getProfile: async () => {
    try {
      const res = await httpService.get("/auth/profile");
      console.log("✅ /profle 返回用户数据：", res); // 
      return res;
    } catch (error) {
      console.error("❌ /profile 请求失败：", error);
      throw error;
    }
  },
  deleteAccount: () => httpService.delete("/auth/delete"), // 或者 DELETE 请求
};

export default authService;
