const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = async (req, res, next) => {
  console.log("🛡️ requireAuth 被调用！");
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "No token provided. Unauthorized." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔓 JWT decoded:", decoded);
    const user = await User.findById(decoded.userId).select("-password");
    console.log("👤 查到的 user:", user);

    if (!user) {
      console.warn("⚠️ 数据库中未找到该用户！userId:", decoded.userId);
      return res.status(401).json({ error: "User not found. Unauthorized." });
    }

    req.user = user; // 把当前用户信息附加到请求对象上，供后续使用
    req.userId = user._id; // ✅ 加这一句！
    next();
  } catch (err) {
    console.error("JWT Auth Error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

module.exports = requireAuth
