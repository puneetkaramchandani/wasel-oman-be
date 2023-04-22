const userServices = require("./user");
const cartServices = require("./cart");
const loginServices = require("./login");
const orderServices = require("./order");
const tableServices = require("./table");
const cuisineServices = require("./cuisine");
const Contact = require("../models/contact");
const productServices = require("./product");
const complaintServices = require("./complaint");
const restaurantServices = require("./restaurant");

module.exports = {
  userServices,
  cartServices,
  orderServices,
  loginServices,
  tableServices,
  cuisineServices,
  productServices,
  complaintServices,
  restaurantServices,
  createContactUsQuery,
};

async function createContactUsQuery(data) {
  const newContactQuery = new Contact({ ...data });
  await newContactQuery.save();
  return { newContactQuery };
}
