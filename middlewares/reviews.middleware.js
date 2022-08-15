// Models
const { Review } = require("../models/reviews.model");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const reviewExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findById(id);

  if (!review) {
    return next(new AppError("Review not found", 404));
  }

  if (review.status !== "active") {
    return next(new AppError("The review is not active", 404));
  }

  req.review = review;
  next();
});

const reviewUser = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { sessionUser } = req;

  if (review.userId !== sessionUser._id) {
    return next(new AppError("You do not own this comment", 404));
  }

  next();
});

module.exports = { reviewExists, reviewUser };
