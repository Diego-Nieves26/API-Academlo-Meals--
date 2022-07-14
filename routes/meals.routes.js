const express = require("express");

// Controllers
const {
  createMeal,
  getAllActiceMeals,
  getMealById,
  updateMeal,
  disableMeal,
} = require("../controllers/meals.controller");

// Middlewares
const { createMealValidator } = require("../middlewares/validators.middleware");
const { mealExists } = require("../middlewares/meals.middleware");
const { restaurantExists } = require("../middlewares/restaurants.middleware");
const { protectSession } = require("../middlewares/auth.middleware");

const mealsRouter = express.Router();

mealsRouter.get("/", getAllActiceMeals);

mealsRouter.get("/:id", mealExists, getMealById);

mealsRouter.use(protectSession);

mealsRouter.post("/:id", createMealValidator, restaurantExists, createMeal);

mealsRouter.patch("/:id", mealExists, updateMeal);

mealsRouter.delete("/:id", mealExists, disableMeal);

module.exports = { mealsRouter };
