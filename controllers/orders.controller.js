// Models
const { Meal } = require("../models/meal.model");
const { Order } = require("../models/order.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { sessionUser } = req;
  const meal = await Meal.findOne({ where: { id: mealId } });

  if (!meal) {
    return next(new AppError("Meal not found", 404));
  }

  const newOrder = await Order.create({
    mealId,
    userId: sessionUser.id,
    totalPrice: meal.price * quantity,
    quantity,
  });

  res.status(201).json({
    status: "success",
    newOrder,
  });
});

const getAllOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const orders = await Order.findAll({
    where: { userId: sessionUser.id },
  });

  res.status(200).json({
    status: "success",
    orders,
  });
});

const completedOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: "completed" });

  res.status(204).json({ status: "success" });
});

const cancelOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: "cancelled" });

  res.status(204).json({ status: "success" });
});

module.exports = {
  createOrder,
  getAllOrders,
  completedOrder,
  cancelOrder,
};
