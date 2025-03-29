const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
connectDB();  // ✅ 连接 MongoDB

const app = require("./app")
const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))