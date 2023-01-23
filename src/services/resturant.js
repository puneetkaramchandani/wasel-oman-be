const Resturant = require("../models/resturant");

module.exports = {
  getAllResturants,
  createNewResturant,
};

async function getAllResturants() {
  const resturants = await Resturant.find();
  return { resturants };
}

async function createNewResturant(data, user) {
  const newResturant = new Resturant({ ...data, user: user._id });
  await newResturant.save();
  return { newResturant };
}
