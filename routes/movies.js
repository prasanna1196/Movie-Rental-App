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
  const { name, language, dvd, fhd, uhd } = req.body;

  try {
    const newMovie = new Movie({
      name,
      language,
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

// Update Movie
router.patch("/:id", adminAuth, async (req, res) => {
  const { name, language, dvd, fhd, uhd } = req.body;

  const movieFields = {};
  if (name) movieFields.name = name;
  if (language) movieFields.language = language;
  if (dvd) movieFields.dvd = dvd;
  if (fhd) movieFields.fhd = fhd;
  if (uhd) movieFields.uhd = uhd;

  try {
    let movie = await Movie.findById(req.params.id);

    if (!movie) return res.status(404).json({ msg: "Movie not found" });

    movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: movieFields },
      { new: true }
    );

    res.json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete Movie
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    let movie = await Movie.findById(req.params.id);

    if (!movie) return res.status(404).json({ msg: "Movie not found" });

    await Movie.findByIdAndRemove(req.params.id);

    res.json({ msg: "Movie removed" });
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
