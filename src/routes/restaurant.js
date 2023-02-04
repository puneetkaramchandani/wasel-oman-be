const express = require("express");
const {
  STATUS_CODES: { SUCCESS },
} = require("../constants");

const {
  catchAsync,
  sendResponse,
  validateSchema,
  createNewRestaurantSchema,
  ExpressError,
} = require("../utils");
const {
  restaurantServices: {
    getAllRestaurants,
    createNewRestaurant,
    getRestaurantById,
    getRestaurantTables,
    getRestaurantProducts,
  },
} = require("../services");
const { vendorOnly } = require("../middleware");
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
    await validateSchema(createNewRestaurantSchema, req.body);
    const data = await createNewRestaurant(req.body, req.user);
    sendResponse(res, SUCCESS, data);
  })
);

// Vendor Only Routes

module.exports = router;
