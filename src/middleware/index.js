const checkUser = require("./checkUser");
const vendorOnly = require("./vendorOnly");
const adminOnly = require("./adminOnly");
const userOnly = require("./userOnly");
const restaurantOnly = require("./restaurantOnly");

module.exports = {
  checkUser,
  adminOnly,
  userOnly,
  vendorOnly,
  restaurantOnly,
};
