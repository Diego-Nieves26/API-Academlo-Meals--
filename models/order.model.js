const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    mealId: {
      ref: "Meal",
      type: mongoose.Schema.ObjectId,
    },
    userId: {
      ref: "User",
      type: mongoose.Schema.ObjectId,
    },
    totalPrice: {
      type: Number,
      required: [true, "Please enter a valid total price"],
    },
    quantity: {
      type: Number,
      required: [true, "Please enter a valid quantity"],
    },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
