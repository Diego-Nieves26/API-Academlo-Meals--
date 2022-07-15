const express = require("express");

// Controllers
const {
  createUser,
  login,
  updateUser,
  deleteUser,
  getAllOrders,
  getOrderById,
} = require("../controllers/users.controller");

// Middlewares
const { createUserValidator } = require("../middlewares/validators.middleware");
const { userExists } = require("../middlewares/users.middleware");
const { orderExists } = require("../middlewares/orders.middleware");
const {
  protectSession,
  protectUserAcoount,
} = require("../middlewares/auth.middleware");

const usersRouter = express.Router();

usersRouter.post("/signup", createUserValidator, createUser);

usersRouter.post("/login", login);

usersRouter.use(protectSession);

usersRouter.patch("/:id", userExists, protectUserAcoount, updateUser);

usersRouter.delete("/:id", userExists, protectUserAcoount, deleteUser);

usersRouter.get("/orders", getAllOrders);

usersRouter.get("/orders/:id", getOrderById);

module.exports = { usersRouter };
