const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Add this health check endpoint (no auth required)
router.get("/", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Access granted", userId: req.user.id });
});

module.exports = router;
