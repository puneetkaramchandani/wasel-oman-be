const userServices = require("./user");
const loginServices = require("./login");
const orderServices = require("./order");
const Contact = require("../models/contact");
const productServices = require("./product");
const restaurantServices = require("./restaurant");
const cartServices = require("./cart");
const tableServices = require("./table");

module.exports = {
  userServices,
  cartServices,
  orderServices,
  loginServices,
  productServices,
  tableServices,
  restaurantServices,
  createContactUsQuery,
};

async function createContactUsQuery(data) {
  const newContactQuery = new Contact({ ...data });
  await newContactQuery.save();
  return { newContactQuery };
}
