const express = require("express");
const {
  STATUS_CODES: { SUCCESS },
} = require("../constants");

const { catchAsync, sendResponse } = require("../utils");
const {
  restaurantServices: { getAllRestaurants, createNewRestaurant },
} = require("../services");
const { vendorOnly } = require("../middleware");

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

// Public Routes

// Vendor Only Routes

/**
 * Middleware to allow for user type === vendor only
 *
 */
router.use(
  catchAsync(async (req, res, next) => {
    await vendorOnly(req, res, next);
  })
);

/**
 * Creates a new restaurant and returns the data
 */
router.post(
  "/new",
  catchAsync(async (req, res) => {
    const data = await createNewRestaurant(req.body, req.user);
    sendResponse(res, SUCCESS, data);
  })
);

// Vendor Only Routes

module.exports = router;
