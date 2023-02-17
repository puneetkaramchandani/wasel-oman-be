const Cart = require("../models/cart");
const Order = require("../models/order");
const Restaurant = require("../models/restaurant");
const { ExpressError } = require("../utils");
const Randomatic = require("randomatic");

module.exports = {
  createNewOrder,
  getMyOrders,
  getRestaurantOrders,
  getOrderById,
};

async function getMyOrders(user) {
  const orders = await Order.find({ user: user._id }).populate([
    {
      path: "products.product",
      model: "Product",
    },
    {
      path: "tables",
      model: "Table",
    },
    {
      path: "restaurant",
      model: "Restaurant",
    },
  ]);
  return { orders };
}

async function getOrderById(order_id, user) {
  const order = await Order.findOne({
    _id: order_id,
    user: user._id,
  }).populate([
    {
      path: "products.product",
      model: "Product",
    },
    {
      path: "tables",
      model: "Table",
    },
    {
      path: "restaurant",
      model: "Restaurant",
    },
  ]);
  return { order };
}

async function getRestaurantOrders(restaurant) {
  const orders = await Order.find({ restaurant: restaurant._id }).populate([
    {
      path: "products.product",
      model: "Product",
    },
    {
      path: "tables",
      model: "Table",
    },
    {
      path: "restaurant",
      model: "Restaurant",
    },
  ]);
  return { orders };
}

async function createNewOrder(user, data) {
  const { cid, bookingDetails } = data;
  const cart = await Cart.findOne({ _id: cid, user: user._id });
  if (cart === null) {
    throw new ExpressError("Cart not found", 402);
  }

  const {
    products = [],
    tables = [],
    restaurant = null,
    totalAmount = 0,
  } = cart;
  const restaurantDetails = await Restaurant.findById(restaurant);

  if (products.length === 0 && tables.length === 0) {
    throw new ExpressError("Cart is empty", 403);
  } else if (restaurant === null) {
    throw new ExpressError("Restaurant cannot be null", 403);
  }

  let orderNo =
    restaurantDetails.name.substring(0, 4).toUpperCase() +
    Randomatic("0", 6).toString();
  let secret = Randomatic("0", 4);
  const order = new Order({
    restaurant: restaurant,
    user: user._id,
    totalAmount: totalAmount,
    tables: tables,
    products: products,
    bookingDetails,
    secret: secret,
    orderNo: orderNo,
  });
  await order.save();
  await cart.delete();
  return { order };
}
