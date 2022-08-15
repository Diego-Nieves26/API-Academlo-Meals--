const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Models
const { User } = require("../models/user.model");
const { Order } = require("../models/order.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

dotenv.config({ path: "./config.env" });

const createUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    return next(new AppError("Email already taken", 400));
  }

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name: username,
    email,
    password: hashPassword,
    role,
  });

  newUser.password = undefined;

  console.log(newUser);
  res.status(201).json({
    status: "success",
    newUser,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, status: "active" });

  if (!user) {
    return next(new AppError("Credentials invalid", 404));
  }

  const isPasswordaValid = await bcrypt.compare(password, user.password);

  if (!isPasswordaValid) {
    return next(new AppError("Credentials invalid", 404));
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30 days",
  });

  res.status(201).json({
    status: "success",
    token,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({ name, email });

  res.status(204).json({ status: "success" });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: "disabled" });

  res.status(204).json({ status: "success" });
});

const getAllOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.find({ userId: sessionUser.id }).populate({
    path: "mealId",
    match: { status: "active" },
    populate: {
      path: "restaurantId",
    },
  });

  res.status(200).json({
    status: "success",
    orders,
  });
});

const getOrderById = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;

  const order = await Order.findOne({
    id,
    userId: sessionUser.id,
  }).populate({
    path: "mealId",
    match: { status: "active" },
    populate: {
      path: "restaurantId",
    },
  });

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  res.status(200).json({
    status: "success",
    order,
  });
});

module.exports = {
  createUser,
  login,
  updateUser,
  deleteUser,
  getAllOrders,
  getOrderById,
};
