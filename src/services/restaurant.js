const Restaurant = require("../models/restaurant");

module.exports = {
  getAllRestaurants,
  createNewRestaurant,
};

async function getAllRestaurants() {
  const restaurants = await Restaurant.find();
  return { restaurants };
}

async function createNewRestaurant(data, user) {
  await Restaurant.checkExistingRestaurant(user);
  const newRestaurant = new Restaurant({ ...data, user: user._id });
  await newRestaurant.save();
  return { newRestaurant };
}
