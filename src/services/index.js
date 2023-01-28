const Contact = require("../models/contact");

const loginServices = require("./login");
const userServices = require("./user");
const restaurantServices = require("./restaurant");

module.exports = {
  loginServices,
  userServices,
  restaurantServices,
  createContactUsQuery,
};

async function createContactUsQuery(data) {
  const newContactQuery = new Contact({ ...data });
  await newContactQuery.save();
  return { newContactQuery };
}
