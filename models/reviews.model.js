const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: {
    ref: "User",
    type: mongoose.Schema.ObjectId,
  },
  comment: {
    type: String,
    required: [true, "Please enter a valid comment"],
  },
  restaurantId: {
    ref: "Restaurant",
    type: mongoose.Schema.ObjectId,
  },
  rating: {
    type: String,
    required: [true, "Please enter a valid rating"],
  },
  status: {
    type: String,
    default: "active",
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = { Review };
