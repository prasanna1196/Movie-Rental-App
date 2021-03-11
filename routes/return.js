const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

const Movie = require("../models/Movie");
const User = require("../models/User");
const Rent = require("../models/Rent");
const ReturnMovie = require("../models/ReturnMovie");

// Return a movie
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Rent.findById(req.params.id);
    const user = await User.findById(req.user);
    const returnFiled = await ReturnMovie.findOne({ orderID: req.params.id });

    if (returnFiled) {
      return res.status(400).json({
        msg: "Already filed for return, Waiting for Admin approval..",
      });
    }

    if (order.penalty) {
      if (order.penalty > user.credits) {
        return res.status(400).json({ msg: "Not enough balance in wallet." });
      }

      // Deduct penalty money
      user.credits -= order.penalty;
      await user.save();
    }

    // Create a new "applied for return" entry
    const returnMovie = new ReturnMovie({
      orderID: order._id,
    });
    await returnMovie.save();

    res.status(200).json({ msg: "Return process initiated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Extend due date
router.get("/renew/:id", auth, async (req, res) => {
  try {
    const order = await Rent.findById(req.params.id);
    const user = await User.findById(req.user);

    // Check if DueDate was extended once
    let difference =
      (new Date(order.dueDate.toLocaleDateString()) -
        new Date(order.rentedOn.toLocaleDateString())) /
      (1000 * 60 * 60 * 24);

    // console.log(new Date(order.dueDate.toLocaleDateString()));
    // console.log(new Date(order.rentedOn.toLocaleDateString()));
    // console.log(difference);

    if (difference > 40) {
      return res
        .status(400)
        .json({ msg: "Due date cannot be extended more than once" });
    }

    let renewDate = new Date();

    // Check for penalty
    if (order.penalty) {
      if (order.penalty > user.credits) {
        return res.json({ msg: "Not enough money in wallet." });
      }

      // Deduct penalty money
      user.credits -= order.penalty;
      await user.save();

      // Set new due date (10 days added to current date)
      renewDate.setDate(renewDate.getDate() + 10);

      order.dueDate = renewDate;
      await order.save();

      res.status(200).json({
        msg: `Renew date extended till ${renewDate.toLocaleDateString()}`,
      });
    } else {
      // If no penalty, extend due date by 10 days

      order.dueDate.setDate(order.dueDate.getDate() + 10);
      console.log(order.dueDate);

      order.dueDate = order.dueDate;
      // Debit money for renewal and extend due date
      user.credits -= order.amount;
      await user.save();

      await order.save();

      res.status(200).json({
        msg: `Renew date extended till ${renewDate.toLocaleDateString()}`,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get the list of movies filed for return
// Admin only access
router.get("/approve/all", auth, async (req, res) => {
  try {
    const approve = await ReturnMovie.find();
    res.status(200).json({ list: approve });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Approve return
// Admin only access
router.patch("/approve/:id", adminAuth, async (req, res) => {
  try {
    const approve = await ReturnMovie.findById(req.params.id);
    const order = await Rent.findById(approve.orderID);
    const user = await User.findById(order.user);
    const movie = await Movie.findById(order.movie);

    // Check if it is filed for return
    if (!approve) return res.status(404).json({ msg: "No match found." });

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

    // Delete entry from ReturnMovie database
    await ReturnMovie.findByIdAndDelete(req.params.id);

    res.status(200).send("Returned successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
