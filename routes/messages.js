const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const User = require("../models/User");
const Message = require("../models/Message");

// Get messages for a user
router.get("/", auth, async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user });
    res.status(200).json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get number of messages for a user
router.get("/count", auth, async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user }).countDocuments();
    res.status(200).json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete message
router.delete("/:id", auth, async (req, res) => {
  try {
    const messages = await Message.findByIdAndDelete(req.params.id);
    res.status(200).json("Message deleted");
    console.log("done");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
