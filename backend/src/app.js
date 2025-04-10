const express = require("express");
const app = express();

// const mongoose = require("./config/db");
require("./config/db");

const cookieParser = require("cookie-parser");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
// const YAML = require('yamljs');
// const swaggerDocument = YAML.load('./src/swagger/swagger.yaml');

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

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
// app.use(cors({
//   origin: [
//     "http://localhost:5173", // ✅ 本地开发前端
//     "https://your-gcp-frontend-url.web.app", // ✅ GCP前端
//     "https://your-api-url.a.run.app" // ✅ GCP后端
//   ],
//   credentials: true,
// }));

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/artsy", require("./routes/artsyRoutes"));
app.use("/api/favorites", require("./routes/favoriteRoutes"));


//app be exported
module.exports = app;