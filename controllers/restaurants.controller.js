// Models
const { Restaurant } = require("../models/restaurant.model");
const { Review } = require("../models/reviews.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({
    status: "success",
    newRestaurant,
  });
});

const getAllActiveRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.find({
    status: "active",
  }).populate({
    path: "reviews",
    match: { status: "active" },
    populate: { path: "userId", select: "-password" },
  });

  res.status(200).json({
    status: "success",
    restaurants,
  });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    status: "success",
    restaurant,
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;
  const { restaurant } = req;

  await restaurant.update({ name, address });

  res.status(204).json({ status: "success" });
});

const disableRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: "disable" });

  res.status(204).json({ status: "success" });
});

const createReview = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;
  const { sessionUser } = req;
  const { comment, rating } = req.body;

  const review = await Review.create({
    userId: sessionUser.id,
    comment,
    restaurantId,
    rating,
  });

  res.status(201).json({
    status: "success",
    review,
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;

  await review.update({ comment, rating });

  res.status(201).json({
    status: "success",
    review,
  });
});

const disableReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: "deleted" });

  res.status(204).json({
    status: "success",
  });
});

module.exports = {
  createRestaurant,
  getAllActiveRestaurants,
  getRestaurantById,
  updateRestaurant,
  disableRestaurant,
  createReview,
  updateReview,
  disableReview,
};
