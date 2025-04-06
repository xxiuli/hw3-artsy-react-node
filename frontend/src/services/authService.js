import httpService from "./httpService";

const authService = {
  login: (data) => httpService.post("/login", data),
  register: (data) => httpService.post("/register", data),
  logout: () => httpService.get("/logout"),
  getProfile: async () => {
    try {
      const res = await httpService.get("/me");
      console.log("✅ /me 返回用户数据：", res); // ✅ 加这行
      return res;
    } catch (error) {
      console.error("❌ /me 请求失败：", error);
      throw error;
    }
  },
  deleteAccount: () => httpService.get("/delete"), // 或者 DELETE 请求
};

export default authService;
