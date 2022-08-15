// Models
const { Restaurant } = require("../models/restaurant.model");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const restaurantExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findById(id).populate({
    path: "reviews",
    match: { status: "active" },
  });

  if (!restaurant) {
    return next(new AppError("Restaurant not found", 404));
  }

  if (restaurant.status !== "active") {
    return next(new AppError("The user is not active", 404));
  }

  req.restaurant = restaurant;
  next();
});

module.exports = { restaurantExists };
