const { body, validationResult } = require("express-validator");

const { AppError } = require("../utils/appError.util");

const checkResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsgs = errors.array().map((err) => err.msg);

    const message = errorMsgs.join(". ");

    return next(new AppError(message, 400));
  }

  next();
};

const createUserValidator = [
  body("username").notEmpty().withMessage("Name cannot be empty"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .isAlphanumeric()
    .withMessage("Password must contain letters and numbers"),
  checkResult,
];

const createRestaurantValidator = [
  body("name").notEmpty().withMessage("Name cannot be empty"),
  body("address").notEmpty().withMessage("Address cannot be empty"),
  body("rating")
    .notEmpty()
    .withMessage("Rating cannot be empty")
    .isInt()
    .withMessage("Rating must be a integer number"),
  checkResult,
];

const createMealValidator = [
  body("name").notEmpty().withMessage("Name cannot be empty"),
  body("price")
    .notEmpty()
    .withMessage("Price cannot be empty")
    .isInt()
    .withMessage("Price must be a integer number"),
  checkResult,
];

const createOrderValidator = [
  body("quantity")
    .notEmpty()
    .withMessage("Quantity cannot be empty")
    .isInt()
    .withMessage("Quantity must be a integer number"),
  body("mealId")
    .notEmpty()
    .withMessage("Meal ID cannot be empty")
    .isInt()
    .withMessage("Meal ID must be a integer number"),
  checkResult,
];

module.exports = {
  createUserValidator,
  createRestaurantValidator,
  createMealValidator,
  createOrderValidator,
};
