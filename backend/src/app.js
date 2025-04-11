const express = require("express");
const app = express();

// const mongoose = require("./config/db");
require("./config/db");

const cookieParser = require("cookie-parser");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Artsy API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080/api",
        // url:"https://hw3-artsy-react-node-backend-25169468532.us-central1.run.app/api-docs",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js"], // 你可以根据实际情况修改路径
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use() if for adding midware
app.use(express.json())
app.use(cookieParser())

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }))

app.use((req, res, next) => {
  console.log("🔍 Request origin:", req.headers.origin);
  next();
});

app.use(cors({
  origin: [
    "http://localhost:5173", // ✅ 本地开发前端
    "https://storage.googleapis.com", // ✅ GCP前端
    "https://storage.googleapis.com/hw3-artsy-react-node-frontend",
    "https://hw3-artsy-react-node-frontend.storage.googleapis.com",
    "https://hw3-artsy-react-node-backend-25169468532.us-central1.run.app",
    "https://storage.googleapis.com/hw3-artsy-react-node-frontend/index.html"
  ],
  credentials: true,
}));

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/artsy", require("./routes/artsyRoutes"));
app.use("/api/favorites", require("./routes/favoriteRoutes"));


//app be exported
module.exports = app;