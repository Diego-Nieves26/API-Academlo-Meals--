const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a valid name"],
    },
    address: {
      type: String,
      required: [true, "Please enter a valid adress"],
    },
    rating: {
      type: Number,
      required: [true, "Please enter a valid rating"],
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

restaurantSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "restaurantId",
  localField: "_id",
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = { Restaurant };
