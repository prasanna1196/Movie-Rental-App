const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const User = require("../models/User");

// Get account details,
// access    Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.status(200).json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Change account details
// access    Private
router.patch("/", auth, async (req, res) => {
  const { name, address, phone } = req.body;

  const profileFields = {};

  if (phone.toString().length !== 10) {
    return res.status(400).send("Invalid number");
  }

  if (name) profileFields.name = name;
  if (address) profileFields.address = address;
  if (phone) profileFields.phone = phone;

  try {
    let profile = await User.findByIdAndUpdate(
      req.user,
      { $set: profileFields },
      { new: true }
    );
    await res.json({ profile });
  } catch (err) {}
});

module.exports = router;
