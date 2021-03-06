const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const adminAuth = require("../middleware/adminAuth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

router.get("/", adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json({ user, msg: "redirect success" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
