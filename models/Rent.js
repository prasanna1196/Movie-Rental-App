const mongoose = require("mongoose");

const RentSchema = mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  quality: {
    type: String,
  },
  amount: {
    type: Number,
  },
  address: {
    type: String,
  },
  phone: {
    type: Number,
  },
  rentedOn: {
    type: Object,
  },
  dueDate: {
    type: Object,
  },
  status: {
    type: Boolean,
    default: true,
  },
  penalty: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Rent", RentSchema);
