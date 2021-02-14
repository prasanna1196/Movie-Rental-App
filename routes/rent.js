const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const mongoose = require;

const Movie = require("../models/Movie");
const User = require("../models/User");
const Rent = require("../models/Rent");

router.get("/", auth, async (req, res) => {
  res.send(req.user);
});

router.post("/", auth, async (req, res) => {
  let { movie, quality } = req.body;
  let amount = 0;

  try {
    let user = await User.findById(req.user);
    const movieId = await Movie.findOne({ name: movie });

    if (quality === "uhd") {
      amount = 10;
      if (movieId.uhd > 1) {
        movieId.uhd -= 1;
        await movieId.save();
      } else {
        return res.json({ msg: "Out of stock" });
      }
    } else {
      amount = 5;
      if (movieId.uhd > 1) {
        movieId.fhd -= 1;
        await movieId.save();
      } else {
        return res.json({ msg: "Out of stock" });
      }
    }

    if (user.credits - amount < 20) {
      return res.json({ msg: "Accout balance cant be less than 20" });
    }

    let rentedOn = new Date();
    let dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    const newRental = new Rent({
      movie: movieId._id,
      user: req.user,
      amount,
      rentedOn,
      dueDate,
    });

    user.credits -= amount;
    await user.save();

    const rental = await newRental.save();
    res.send(rental);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
