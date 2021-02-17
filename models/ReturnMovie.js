const mongoose = require("mongoose");

const ReturnMovieSchema = mongoose.Schema({
  orderID: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Return", ReturnMovieSchema);
