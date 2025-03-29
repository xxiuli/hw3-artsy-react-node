// const mongoose = require("./config/db");
require("./config/db");

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

// app.use() if for adding midware
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173",
            "https://your-gcp-frontend-url.web.app",  // GCP 前端（Cloud Storage 或 Firebase Hosting）
            "https://your-api-url.a.run.app"]  // GCP 后端（Cloud Run API）
}))

// ✅ 配置 Swagger 文档信息
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Artsy HW API",
            version: "1.0.0",
            description: "This is description detail."
        },
        servers: [
            {
                url: "http://localhost:8080",  // 本地 API 地址
                description: "Local server"
            }
        ]
    },
    apis: [__dirname + "/routes/*.js"]
    //apis: ["./src/routes/*.js"]  // 指定路由文件里写的 API 注释
};

// console.log(swaggerJsDoc(swaggerOptions));
// console.log("__dirname:", __dirname);

const swaggerDocs = swaggerJsDoc(swaggerOptions); //create swagger doc
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));// make swagger `/api-docs` visitable

// routes
app.use("/api/hello", require("./routes/helloRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/artists", require("./routes/artistRoutes"));
// app.use("/api/favorites", require("./routes/favoritesRoutes"));

//app be exported
module.exports = app;