// src/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");

//helper
function generateGravatarUrl(email) {
  const emailHash = crypto
    .createHash("md5")
    .update(email.trim().toLowerCase())
    .digest("hex");
  return `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;
}

//helper
function setAuthCookie(res, user) {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  console.log("🎫 生成的 token:", token);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
}

// Endpoint: Register
exports.register = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    // Check User Exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Gen encript password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Gen Gravator profile image
    const profileImageUrl = generateGravatarUrl(email);

    // Save this user
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      profileImageUrl: profileImageUrl,
    });
    await newUser.save();

    // Set Cookie (with JWT)
    setAuthCookie(res, newUser);

    return res.status(201).json({
      // user: {
        fullname: newUser.fullname,
        email: newUser.email,
        profileImageUrl: newUser.profileImageUrl,
      // }
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ error: "Registration failed" });
  }
};

// Endpoint: Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check User Exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Set Cookie (with JWT)
    setAuthCookie(res, user);

    return res.json({
      // user: {
        fullname: user.fullname,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
      // }
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ error: "Login failed" });
  }
};

// Endpoint: Logout user
exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

// Endpoint: Get user profile from token
exports.getProfile = async (req, res) => {
  try {
    console.log("✅ req.user:", req.user);
    console.log("✅ req.userId:", req.userId);
    const user = req.user; 

    return res.json({
      // user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
      // }
    });
  } catch (err) {
    return res.status(401).json({ error: "Invalid token or session expired" });
  }
};

// Endpoint: Delete account
exports.deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);

    // 清除 cookie
    res.clearCookie("token");

    return res.json({ message: "Account deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Delete failed" });
  }
};

// Endpoint: Check if email already exists
exports.checkEmailExists = async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const user = await User.findOne({ email });
    return res.json({ exists: !!user });
  } catch (err) {
    return res.status(500).json({ error: "Failed to check email" });
  }
};
