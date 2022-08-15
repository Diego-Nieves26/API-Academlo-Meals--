// Models
const { User } = require("../models/user.model");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (user.status !== "active") {
    return next(new AppError("The user is not active", 404));
  }

  req.user = user;
  next();
});

const isAdmin = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  if (sessionUser.role !== "admin") {
    return next(new AppError("You are not admin", 404));
  }

  next();
});

module.exports = { userExists, isAdmin };
