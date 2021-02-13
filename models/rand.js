const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 1,
    max: 100,
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
  date: {
    type: Date,
    default: Date.now,
  },
  starCast: {
    type: Array,
    required: true,
  },
  rentals: [
    {
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "User",
      },
      dueDate: {
        type: Date,
      },
    },
  ],
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "customer",
  },
  rentals: [
    {
      movie: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Movie",
      },
      dueDate: {
        type: Date,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Movie = mongoose.model("Movie", MovieSchema);
const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
  Movie,
};
