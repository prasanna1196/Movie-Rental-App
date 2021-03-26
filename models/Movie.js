const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

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
    required: false,
  },
  director: {
    type: String,
    required: false,
    min: 1,
    max: 100,
  },
  genre: {
    type: String,
  },
  language: {
    type: String,
  },
  starCast: {
    type: Array,
    required: false,
  },
  dvd: {
    type: Number,
    default: 10,
  },
  fhd: {
    type: Number,
    default: 10,
  },
  uhd: {
    type: Number,
    default: 5,
  },
  popularity: {
    type: Number,
  },
  reviews: [reviewSchema],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Movie", MovieSchema);
