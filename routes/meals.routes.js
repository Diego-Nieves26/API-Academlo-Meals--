const express = require("express");

// Controllers
const {
  createMeal,
  getAllActiveMeals,
  getMealById,
  updateMeal,
  disableMeal,
} = require("../controllers/meals.controller");

// Middlewares
const { createMealValidator } = require("../middlewares/validators.middleware");
const { mealExists } = require("../middlewares/meals.middleware");
const { restaurantExists } = require("../middlewares/restaurants.middleware");
const { isAdmin } = require("../middlewares/users.middleware");
const { protectSession } = require("../middlewares/auth.middleware");

const mealsRouter = express.Router();

mealsRouter.get("/", getAllActiveMeals);

mealsRouter.get("/:id", mealExists, getMealById);

mealsRouter.use(protectSession);

mealsRouter.post("/:id", createMealValidator, restaurantExists, createMeal);

mealsRouter.patch("/:id", isAdmin, mealExists, updateMeal);

mealsRouter.delete("/:id", isAdmin, mealExists, disableMeal);

module.exports = { mealsRouter };
