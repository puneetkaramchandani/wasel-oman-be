const Contact = require("../models/contact");

const loginServices = require("./login");
const userServices = require("./user");
const resturantServices = require("./resturant");

module.exports = {
  loginServices,
  userServices,
  resturantServices,
  createContactUsQuery,
};

async function createContactUsQuery(data) {
  const newContactQuery = new Contact({ ...data });
  return { newContactQuery };
}
