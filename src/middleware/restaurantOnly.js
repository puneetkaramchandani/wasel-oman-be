const { ExpressError } = require("../utils");
const {
  STATUS_CODES: { BAD_REQUEST },
} = require("../constants");
const Restaurant = require("../models/restaurant");

async function restaurantOnly(req, res, next) {
  const restaurant = await Restaurant.findOne({
    user: req.user,
  });
  if (restaurant != null) {
    req.restaurant = restaurant;
    next();
  } else {
    throw new ExpressError("Create restaurant to add products", 403);
  }
}

module.exports = restaurantOnly;
