const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 1,
    max: 100,
    unique: true,
  },
  year: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
    min: 1,
    max: 100,
  },
  starCast: {
    type: Array,
    required: true,
  },
  fhd: {
    type: Number,
    default: 5,
  },
  uhd: {
    type: Number,
    default: 5,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Movie", MovieSchema);
