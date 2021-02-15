const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const Movie = require("../models/Movie");
const User = require("../models/User");
const Rent = require("../models/Rent");

// Get all the movies rented by current user
// Access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await Rent.find({ user: req.user });
    res.status(200).json({ myRentals: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Rent a new movie
// Access   Private
router.post("/", auth, async (req, res) => {
  let { movie, quality, address, phone, setDefaultAddress } = req.body;
  let amount = 0;

  try {
    let user = await User.findById(req.user);

    // Use default address of user account if no address is provided
    if (!address && !user.address) {
      return res
        .status(400)
        .send(
          "Please enter a valid address  or  Go to myAccount and set a default address"
        );
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
    const current = await Rent.findOne({ movie: getMovie.id, user: req.user });

    if (current) {
      return res
        .status(400)
        .send("Movie cannot be rented again before its due date.");
    }

    // Set price based on quality
    if (quality === "uhd") {
      amount = 10;
      if (getMovie.uhd > 1) {
        // Update the availability
        getMovie.uhd -= 1;
        await getMovie.save();
      } else {
        return res.json({ msg: "Out of stock" });
      }
    } else {
      amount = 5;
      if (getMovie.fhd > 1) {
        getMovie.fhd -= 1;
        await getMovie.save();
      } else {
        return res.json({ msg: "Out of stock" });
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
    await user.save();

    //Set entered address as default for further orders
    if (setDefaultAddress === true) {
      user.address = address;
      await user.save();
    }

    // Create order object
    const newRental = new Rent({
      movie: getMovie._id,
      user: req.user,
      amount,
      rentedOn,
      dueDate,
      address,
      phone,
    });

    // Complete order
    const rental = await newRental.save();
    res.send(rental);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
