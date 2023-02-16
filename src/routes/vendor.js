const express = require("express");
const {
  STATUS_CODES: { SUCCESS },
} = require("../constants");

const {
  catchAsync,
  sendResponse,
  validateSchema,
  createNewRestaurantSchema,
} = require("../utils");
const {
  restaurantServices: { createNewRestaurant, getMyRestaurant },
} = require("../services");
const { vendorOnly } = require("../middleware");

const router = express.Router();

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

router.get(
  "/myRestaurant",
  catchAsync(async (req, res) => {
    const data = await getMyRestaurant(req.user);
    sendResponse(res, SUCCESS, data);
  })
);

router.post(
  "/createRestaurant",
  catchAsync(async (req, res) => {
    await validateSchema(createNewRestaurantSchema, req.body);
    const data = await createNewRestaurant(req.body, req.user);
    sendResponse(res, SUCCESS, data);
  })
);

// Vendor Only Routes

module.exports = router;
