const express = require("express");
const {
  STATUS_CODES: { SUCCESS },
} = require("../constants");

const { catchAsync, sendResponse, ExpressError } = require("../utils");
const {
  restaurantServices: {
    getAllRestaurants,
    getRestaurantById,
    getRestaurantTables,
    getRestaurantProducts,
  },
} = require("../services");
const { ObjectId } = require("mongodb");

const router = express.Router();

// Public Routes

/**
 * Returns a list of registered restaurants
 */
router.get(
  "/",
  catchAsync(async (req, res) => {
    const data = await getAllRestaurants();
    sendResponse(res, SUCCESS, data);
  })
);

router.get(
  "/:rid",
  catchAsync(async (req, res) => {
    const { rid = null } = req.params;
    if (!ObjectId.isValid(rid)) {
      throw new ExpressError("Invalid restaurant id", 403);
    }
    const data = await getRestaurantById(rid);
    sendResponse(res, SUCCESS, data);
  })
);

router.get(
  "/:rid/products",
  catchAsync(async (req, res) => {
    const { rid = null } = req.params;
    if (!ObjectId.isValid(rid)) {
      throw new ExpressError("Invalid restaurant id", 403);
    }
    const data = await getRestaurantProducts(rid);
    sendResponse(res, SUCCESS, data);
  })
);

router.get(
  "/:rid/tables",
  catchAsync(async (req, res) => {
    const { rid = null } = req.params;
    if (!ObjectId.isValid(rid)) {
      throw new ExpressError("Invalid restaurant id", 403);
    }
    const data = await getRestaurantTables(rid);
    sendResponse(res, SUCCESS, data);
  })
);

// Public Routes

module.exports = router;
