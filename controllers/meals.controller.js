// Models
const { Meal } = require("../models/meal.model");
const { Restaurant } = require("../models/restaurant.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

const createMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const newMeal = await Meal.create({
    name,
    price,
    restaurantId: id,
  });

  res.status(201).json({
    status: "success",
    newMeal,
  });
});

const getAllActiveMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.find({ status: "active" }).populate("restaurantId");

  res.status(200).json({
    status: "success",
    meals,
  });
});

const getMealById = catchAsync(async (req, res, next) => {
  const { meal } = req;

  res.status(201).json({
    status: "success",
    meal,
  });
});

const updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  await meal.update({ name, price });

  res.status(204).json({ status: "success" });
});

const disableMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: "disable" });

  res.status(204).json({ status: "success" });
});

module.exports = {
  createMeal,
  getAllActiveMeals,
  getMealById,
  updateMeal,
  disableMeal,
};
