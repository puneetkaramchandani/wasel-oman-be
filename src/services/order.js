const Cart = require("../models/cart");
const Order = require("../models/order");
const { ExpressError } = require("../utils");
const Randomatic = require("randomatic");

module.exports = { createNewOrder, getMyOrders, getRestaurantOrders };

async function getMyOrders(user) {
  const orders = await Order.find({ user: user._id });
  return { orders };
}

async function getRestaurantOrders(restaurant) {
  const orders = await Order.find({ restaurant: restaurant });
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

  if (products.length === 0 && tables.length === 0) {
    throw new ExpressError("Cart is empty", 403);
  } else if (restaurant === null) {
    throw new ExpressError("Restaurant cannot be null", 403);
  }

  let secret = Randomatic("0", 4);
  const order = new Order({
    restaurant: restaurant,
    user: user._id,
    totalAmount: totalAmount,
    tables: tables,
    products: products,
    bookingDetails,
    secret: secret,
  });
  await order.save();
  await cart.delete();
  return { order };
}
