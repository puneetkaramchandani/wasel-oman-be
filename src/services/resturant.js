const Resturant = require("../models/resturant");

module.exports = {
  getAllResturants,
  createNewResturant,
};

async function getAllResturants() {
  const resturants = await Resturant.find();
  return { resturants };
}

async function createNewResturant(data) {
  const newResturant = new Resturant({ ...data });
  return newResturant;
}
