const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { DateTime } = require("luxon");

const Movie = require("../models/Movie");
const User = require("../models/User");
const Rent = require("../models/Rent");

const graphArray = require("../middleware/AdminGraphStats");

// Get total number of users
router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.countDocuments();
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get total number of movies
router.get("/movies", auth, async (req, res) => {
  try {
    const movies = await Movie.countDocuments();
    res.status(200).json(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get total number of rentals
router.get("/rentals", auth, async (req, res) => {
  try {
    const rentals = await Rent.countDocuments();
    res.status(200).json(rentals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/graph", auth, async (req, res) => {
  try {
    const rentals = await Rent.find();

    const result = graphArray(rentals);

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
