// Models
const { Order } = require("../models/order.model");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const orderExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  if (order.status !== "active") {
    return next(new AppError("The user is not active", 404));
  }

  req.order = order;
  next();
});

const verifyOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { order } = req;

  if (!sessionUser._id.equals(order.userId)) {
    return next(new AppError("This is not your order", 404));
  }

  req.order = order;
  next();
});

module.exports = { orderExists, verifyOrder };
