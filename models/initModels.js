const initModels = () => {
  const { Restaurant } = require("./restaurant.model");
  const { Review } = require("./reviews.model");
  const { Order } = require("./order.model");
  const { User } = require("./user.model");
  const { Meal } = require("./meal.model");

  Restaurant.hasMany(Review, { foreignKey: "restaurantId" });
  Review.belongsTo(Restaurant);

  Restaurant.hasMany(Meal, { foreignKey: "restaurantId" });
  Meal.belongsTo(Restaurant);

  User.hasMany(Review, { foreignKey: "userId" });
  Review.belongsTo(User);

  User.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(User);

  Meal.hasOne(Order, { foreignKey: "mealId" });
  Order.belongsTo(Meal);
};

module.exports = { initModels };
