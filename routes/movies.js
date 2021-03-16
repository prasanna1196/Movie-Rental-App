const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Movie = require("../models/Movie");

// Get the list of movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ dvd: 1 });
    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Add new movies
router.post("/", adminAuth, async (req, res) => {
  const { name, year, language, director, starCast, dvd, fhd, uhd } = req.body;

  try {
    const newMovie = new Movie({
      name,
      year,
      language,
      director,
      starCast,
      dvd,
      fhd,
      uhd,
    });

    const movie = await newMovie.save();
    res.json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a single movie by _id
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findOne({
      _id: req.params.id,
    });
    res.json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a single movie by name
router.get("/name/:title", async (req, res) => {
  try {
    const movie = await Movie.findOne({
      name: new RegExp(req.params.title, "i"),
    });
    res.json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Search movies by name
router.get("/search/:title", async (req, res) => {
  try {
    const movie = await Movie.find({
      name: new RegExp(req.params.title, "i"),
    });

    res.json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
