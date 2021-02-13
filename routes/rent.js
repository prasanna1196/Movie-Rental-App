const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

router.get("/", (req, res) => {
  res.send("hi");
});

module.exports = router;
