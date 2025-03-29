const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: 测试 API
 *     description: 返回 "Hello, World!"
 *     responses:
 *       200:
 *         description: 成功返回
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello, TEST World!"
 */
router.get("/hello", (req, res) => {
    res.json({ message: "Hello, W-World!" });
});

module.exports = router;
