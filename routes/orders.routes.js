const express = require("express");

// Controllers
const {
  createOrder,
  getAllOrders,
  completedOrder,
  cancelOrder,
} = require("../controllers/orders.controller");

// Middlewares
const {
  createOrderValidator,
} = require("../middlewares/validators.middleware");
const { orderExists } = require("../middlewares/orders.middleware");
const { protectSession } = require("../middlewares/auth.middleware");

const ordersRouter = express.Router();

ordersRouter.use(protectSession);

ordersRouter.post("/", createOrderValidator, createOrder);

ordersRouter.get("/me", getAllOrders);

ordersRouter.patch("/:id", orderExists, completedOrder);

ordersRouter.delete("/:id", orderExists, cancelOrder);

module.exports = { ordersRouter };
