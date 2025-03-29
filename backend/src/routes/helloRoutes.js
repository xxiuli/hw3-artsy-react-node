const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: HELLO TEST API
 *     description: return "Hello, World!"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "hellw, orldddd!" 
 */
router.get("/", (req, res) => {  
    // 测试 MongoDB 连接状态
    const mongoStatus = mongoose.connection.readyState === 1 ? "✅ Connected" : "❌ Not Connected";

    res.json({ 
        message: "hello, world!", 
        mongoDB: mongoStatus 
    });  
});

module.exports = router;
