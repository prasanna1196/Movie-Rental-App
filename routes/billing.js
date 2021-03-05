const express = require("express");
const router = express.Router();
const config = require("config");
const key = config.get("stripeSecretKey");
const stripe = require("stripe")(key);
const auth = require("../middleware/auth");

const User = require("../models/User");

router.post("/:amount", auth, async (req, res) => {
  const charge = await stripe.charges.create({
    amount: req.params.amount,
    currency: "INR",
    description: `Pay ${req.params.amount}`,
    source: req.body.id,
  });

  let amount = parseInt(req.params.amount) / 100;

  let user = await User.findById(req.user);
  user.credits += amount;
  await user.save();
  res.send(user);
});

module.exports = router;
