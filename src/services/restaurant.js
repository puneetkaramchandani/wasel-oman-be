const Table = require("../models/table");
const Product = require("../models/product");
const { ExpressError } = require("../utils");
const Restaurant = require("../models/restaurant");

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  createNewRestaurant,
  getRestaurantProducts,
  getRestaurantTables,
  getMyRestaurant,
};

async function getMyRestaurant(user) {
  const restaurant = await Restaurant.findOne({ user: user });
  return { restaurant };
}

async function getAllRestaurants() {
  const restaurants = await Restaurant.find();
  return { restaurants };
}

async function getRestaurantById(rid) {
  const restaurant = await Restaurant.findById(rid);
  if (restaurant === null) {
    throw new ExpressError("Restaurant not found", 403);
  }
  return { restaurant };
}

async function createNewRestaurant(data, user) {
  await Restaurant.checkExistingRestaurant(user);
  const newRestaurant = new Restaurant({ ...data, user: user._id });
  await newRestaurant.save();
  return { newRestaurant };
}

async function getRestaurantProducts(rid) {
  const products = (await Product.find({ restaurant: rid })) || [];
  return { products };
}

async function getRestaurantTables(rid) {
  const tables = (await Table.find({ restaurant: rid })) || [];
  return { tables };
}
