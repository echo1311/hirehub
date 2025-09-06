const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../db"); // your DB connection file
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];

    // 🧠 Create token
    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login successful",
      user: { id: user.id, name: user.name, role: user.role },
      token
    });
  });
});

module.exports = router;
