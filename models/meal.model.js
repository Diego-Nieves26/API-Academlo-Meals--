const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a valid name"],
    },
    price: {
      type: Number,
      required: [true, "Please enter a valid price"],
    },
    restaurantId: {
      ref: "Restaurant",
      type: mongoose.Schema.ObjectId,
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

mealSchema.virtual("restaurant", {
  ref: "Restaurant",
  foreignField: "restaurantId",
  localField: "_id",
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = { Meal };
