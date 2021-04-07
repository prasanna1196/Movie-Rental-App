const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Movie = require("../models/Movie");
const User = require("../models/User");
const Rent = require("../models/Rent");

// Get the current list of rented movies
router.get("/", auth, async (req, res) => {
  try {
    const rentals = await Rent.find({ user: req.user, status: true });
    res.status(200).json(rentals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get one rental by id
router.get("/one/:id", auth, async (req, res) => {
  try {
    const rental = await Rent.findById(req.params.id);
    res.status(200).json(rental);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get all the movies rented by a user
router.get("/all", auth, async (req, res) => {
  try {
    const rentals = await Rent.find({ user: req.user });
    res.status(200).json(rentals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get one movie rented by user
router.get("/:id", auth, async (req, res) => {
  try {
    const rental = await Rent.findOne({
      user: req.user,
      _id: req.params.id,
      status: true,
    });
    res.status(200).json(rental);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Rent a new movie
router.post("/", auth, async (req, res) => {
  let { movie, quality, address, setDefaultAddress, phone } = req.body;
  let amount = 0;

  try {
    let user = await User.findById(req.user);

    // Use default address of user account if no address is provided
    if (!address && !user.address) {
      return res.status(400).json({
        msg:
          "Please enter a valid address  or  Go to myAccount and set a default address",
      });
    }
    if (!address && user.address) {
      // Use default address instead
      address = user.address;
    }

    // Use default phone of user account if no phone is provided
    if (!phone) {
      phone = user.phone;
    }

    // Find movie by its name
    const getMovie = await Movie.findOne({ name: movie });

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
      amount = 100;
      if (getMovie.uhd > 1) {
        // Update the availability
        getMovie.uhd -= 1;
      } else {
        return res
          .status(404)
          .json({ msg: `Sorry, ${quality} format is out of stock` });
      }
    } else if (quality === "fhd") {
      amount = 70;
      if (getMovie.fhd > 1) {
        getMovie.fhd -= 1;
      } else {
        console.log("out of stock");
        return res
          .status(400)
          .json({ msg: `Sorry, ${quality} format is out of stock` });
      }
    } else {
      amount = 50;
      if (getMovie.dvd > 1) {
        getMovie.dvd -= 1;
      } else {
        return res
          .status(404)
          .json({ msg: `Sorry, ${quality} format is out of stock` });
      }
    }

    // Check for minimum balance
    if (user.credits - amount < 20) {
      return res
        .status(400)
        .json({ msg: "Accout balance can't be less than 20" });
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
    // console.log(rental);
    res.json(rental);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Calculate penalty for active orders
router.get("/check/penalty", auth, async (req, res) => {
  try {
    const rentals = await Rent.find({ user: req.user, status: true });
    for (let rental of rentals) {
      let difference =
        (new Date(new Date().toLocaleDateString()) -
          new Date(rental.dueDate.toLocaleDateString())) /
        (1000 * 60 * 60 * 24);

      if (difference > 1) {
        penalty = Math.floor(difference * rental.amount * 0.05);
        console.log(penalty);
        rental.penalty = penalty;
        await rental.save();
      }
    }
    res.status(200).json({ msg: "Info updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
