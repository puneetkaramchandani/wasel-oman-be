const express = require("express");
const {
  catchAsync,
  sendResponse,
  ExpressError,
  validateSchema,
  newOrderSchema,
} = require("../utils");
const {
  STATUS_CODES: { SUCCESS },
} = require("../constants");
const {
  orderServices: {
    createNewOrder,
    getMyOrders,
    getOrderById,
    getRestaurantOrders,
  },
} = require("../services");
const { vendorOnly, restaurantOnly } = require("../middleware");
const { ObjectId } = require("mongodb");

const router = express.Router();

router.get(
  "/",
  catchAsync(async (req, res) => {
    const data = await getMyOrders(req.user);
    sendResponse(res, SUCCESS, data);
  })
);

router.get(
  "/:order_id",
  catchAsync(async (req, res) => {
    const { order_id } = req.params;
    if (!ObjectId.isValid(order_id)) {
      throw new ExpressError("Invalid order id", 403);
    }
    const data = await getOrderById(order_id, req.user);
    sendResponse(res, SUCCESS, data);
  })
);

router.post(
  "/new",
  catchAsync(async (req, res) => {
    await validateSchema(newOrderSchema, req.body);
    const { cid = null } = req.body;
    if (!ObjectId.isValid(cid)) throw new ExpressError("Invalid card id", 403);
    const data = await createNewOrder(req.user, req.body);
    sendResponse(res, SUCCESS, data);
  })
);

// Vendor Only
router.use(
  catchAsync(async (req, res, next) => {
    await vendorOnly(req, res, next);
  })
);

router.use(
  catchAsync(async (req, res, next) => {
    await restaurantOnly(req, res, next);
  })
);

router.get(
  "/restaurant",
  catchAsync(async (req, res) => {
    const data = await getRestaurantOrders(req.restaurant);
    sendResponse(res, SUCCESS, data);
  })
);

module.exports = router;
