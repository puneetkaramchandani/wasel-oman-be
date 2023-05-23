const { createHostedPaymentPageRequest } = require("../helper/checkout");
const Cart = require("../models/cart");
const Order = require("../models/order");
const Restaurant = require("../models/restaurant");
const { ExpressError } = require("../utils");
const Randomatic = require("randomatic");
const Payment = require("../models/payment");
const paymentServices = require("./payment");

module.exports = {
  createNewOrder,
  getMyOrders,
  getRestaurantOrders,
  getOrderById,
  getRestaurantOrderById,
  completeOrder,
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

  const payment = await paymentServices.getPaymentDetails(order_id);

  return { order, payment };
}

async function getRestaurantOrders(restaurant) {
  const orders = await Order.find({ restaurant: restaurant._id })
    .select("-secret")
    .populate([
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

async function getRestaurantOrderById(oid, restaurant) {
  const order = await Order.findOne({
    _id: oid,
    restaurant: restaurant._id,
  })
    .select("-secret")
    .populate([
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

  // let secret = Randomatic("0", 4);

  const order = new Order({
    restaurant: restaurant,
    user: user._id,
    totalAmount: totalAmount,
    tables: tables,
    products: products,
    bookingDetails,
    orderNo: orderNo,
  });

  const res = await createHostedPaymentPageRequest({
    totalAmount,
    order_id: order._id,
    customerName: `${bookingDetails.firstName} ${bookingDetails.lastName}`,
    customerEmail: bookingDetails.email,
  });

  const payment = new Payment({
    hostedPaymentPageId: res.id,
    order: order._id,
    paymentPageLinkPublic: res._links.redirect.href,
  });

  await payment.save();
  await order.save();
  await cart.delete();

  return { order };
}

async function completeOrder(data, restaurant) {
  const { oid = "", orderSecret = "" } = data;
  const order = await Order.findOne({ _id: oid, restaurant });
  if (!order) {
    throw new ExpressError("Order not found", 400);
  } else if (order.status === "completed") {
    throw new ExpressError("Order is already completed", 300);
  } else if (order.secret != parseInt(orderSecret)) {
    throw new ExpressError("Invalid order secret", 400);
  } else {
    let updatedOrder = await Order.findByIdAndUpdate(
      oid,
      { status: "completed" },
      { new: true, runValidators: true }
    );
    return { order: updatedOrder };
  }
}
