const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

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
router.patch(
  "/",
  auth,
  [
    check("name", "Name should be minimum 3 characters long and maximum 30")
      .optional()
      .isString()
      .isLength({ min: 3, max: 30 }),
    check(
      "address",
      "Address should be minimum 15 characters long and maximum 150"
    )
      .isString()
      .isLength({ min: 15, max: 150 }),
    check("phone", "Provide a valid 10 digit phone number")
      .optional()
      .isNumeric()
      .isLength({ min: 10, max: 10 }),
  ],
  async (req, res) => {
    const { name, address, phone } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const profileFields = {};

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
  }
);

module.exports = router;
