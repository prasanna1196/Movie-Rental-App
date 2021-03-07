const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const Movie = require("../models/Movie");
const User = require("../models/User");
const Rent = require("../models/Rent");

// Get the current list of rented movies
router.get("/", auth, async (req, res) => {
  try {
    const user = await Rent.find({ user: req.user, status: true });
    res.status(200).json({ myRentals: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get all the movies rented by a user
router.get("/all", auth, async (req, res) => {
  try {
    const user = await Rent.find({ user: req.user });
    res.status(200).json({ myRentals: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Rent a new movie
router.post("/", auth, async (req, res) => {
  let { movie, quality, address, setDefaultAddress } = req.body;
  let amount = 0;

  try {
    let user = await User.findById(req.user);

    // Use default address of user account if no address is provided
    if (!address && !user.address) {
      return res
        .status(400)
        .json({
          msg:
            "Please enter a valid address  or  Go to myAccount and set a default address",
        });
    }
    if (!address && user.address) {
      // Use default address instead
      address = user.address;
    }

    // Use default phone of user account if no phone is provided
    // if (!phone) {
    phone = user.phone;
    // }

    // Find movie by its name
    const getMovie = await Movie.findOne({ name: movie });
    console.log(getMovie);

    // Check if the user currently has a copy of this movie
    const current = await Rent.findOne({
      movie: getMovie._id,
      user: req.user,
      status: true,
    });

    if (current) {
      console.log("alredy rented");
      return res.status(400).json({ msg: "Already rented" });
    }

    // Set price based on quality
    if (quality === "uhd") {
      amount = 10;
      if (getMovie.uhd > 1) {
        // Update the availability
        getMovie.uhd -= 1;
      } else {
        return res.json({ msg: `Sorry, ${quality} format is out of stock` });
      }
    } else if (quality === "fhd") {
      amount = 5;
      if (getMovie.fhd > 1) {
        getMovie.fhd -= 1;
      } else {
        return res.json({ msg: `Sorry, ${quality} format is out of stock` });
      }
    } else {
      amount = 2;
      if (getMovie.dvd > 1) {
        getMovie.dvd -= 1;
      } else {
        return res.json({ msg: `Sorry, ${quality} format is out of stock` });
      }
    }

    // Check for minimum balance
    if (user.credits - amount < 20) {
      return res.json({ msg: "Accout balance can't be less than 20" });
    }

    // Set current and dueDate
    let rentedOn = new Date();
    let dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    // Deduct credits from user
    user.credits -= amount;

    //Set entered address as default for further orders
    if (setDefaultAddress === true) {
      user.address = address;
    }

    // Create order object
    const newRental = new Rent({
      movie: getMovie._id,
      user: req.user,
      amount,
      quality,
      rentedOn,
      dueDate,
      address,
      phone,
    });

    // Complete order
    await user.save();
    await getMovie.save();
    const rental = await newRental.save();
    res.send(rental);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
