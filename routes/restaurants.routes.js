const express = require("express");

// Controllers
const {
  createRestaurant,
  getAllActiveRestaurants,
  getRestaurantById,
  updateRestaurant,
  disableRestaurant,
  createReview,
  updateReview,
  disableReview,
} = require("../controllers/restaurants.controller");

// Middlewares
const {
  createRestaurantValidator,
} = require("../middlewares/validators.middleware");
const { restaurantExists } = require("../middlewares/restaurants.middleware");
const {
  reviewExists,
  reviewUser,
} = require("../middlewares/reviews.middleware");
const { protectSession } = require("../middlewares/auth.middleware");

const restaurantsRouter = express.Router();

restaurantsRouter.get("/", getAllActiveRestaurants);

restaurantsRouter.get("/:id", restaurantExists, getRestaurantById);

restaurantsRouter.use(protectSession);

restaurantsRouter.post("/", createRestaurantValidator, createRestaurant);

restaurantsRouter.patch("/:id", restaurantExists, updateRestaurant);

restaurantsRouter.delete("/:id", restaurantExists, disableRestaurant);

restaurantsRouter.post("/reviews/:restaurantId", createReview);

restaurantsRouter.patch("/reviews/:id", reviewExists, reviewUser, updateReview);

restaurantsRouter.delete(
  "/reviews/:id",
  reviewExists,
  reviewUser,
  disableReview
);

module.exports = { restaurantsRouter };
