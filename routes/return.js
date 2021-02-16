const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Movie = require("../models/Movie");
const User = require("../models/User");
const Rent = require("../models/Rent");

// Return a movie
router.post("/:id", auth, async (req, res) => {
  try {
    const order = await Rent.findById(req.params.id);
    const user = await User.findById(req.user);
    const movie = await Movie.findById(order.movie);

    // Check for penalty
    if (order.penalty) {
      if (order.penalty > user.credits) {
        return res.json({ msg: "Not enough money in wallet." });
      }

      // Deduct penalty money
      user.credits -= order.penalty;
      await user.save();
    }

    // Update number of available discs
    if (order.quality === "uhd") {
      movie.uhd += 1;
      await movie.save();
    } else if (order.quality === "fhd") {
      movie.fhd += 1;
      await movie.save();
    } else {
      movie.dvd += 1;
      await movie.save();
    }

    // Update order status
    order.status = false;
    await order.save();

    res.status(200).send("Returned successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Extend due date
router.post("/renew/:id", auth, async (req, res) => {
  try {
    const order = await Rent.findById(req.params.id);
    const user = await User.findById(req.user);

    // Check for penalty
    if (order.penalty) {
      if (order.penalty > user.credits) {
        return res.json({ msg: "Not enough money in wallet." });
      }

      // Deduct penalty money
      user.credits -= order.penalty;
      await user.save();
    }

    // Set new due date
    let renewDate = new Date();
    renewDate.setDate(renewDate.getDate() + 15);

    // Debit money for renewal and extend due date
    user.credits -= order.amount;
    await user.save();

    order.dueDate = renewDate;
    await order.save();

    res.status(200).send(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
