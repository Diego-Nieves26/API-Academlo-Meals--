// Models
const { Meal } = require("../models/meal.model");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const mealExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await Meal.findById(id).populate("restaurantId");

  if (!meal) {
    return next(new AppError("Meal not found", 404));
  }

  if (meal.status !== "active") {
    return next(new AppError("The meal is not active", 404));
  }

  req.meal = meal;
  next();
});

module.exports = { mealExists };
