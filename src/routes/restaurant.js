const express = require("express");
const {
  STATUS_CODES: { SUCCESS },
} = require("../constants");

const { catchAsync, sendResponse } = require("../utils");
const {
  restaurantServices: { getAllRestaurants, createNewRestaurant },
} = require("../services");

const router = express.Router();

router.get(
  "/",
  catchAsync(async (req, res) => {
    const data = await getAllRestaurants();
    sendResponse(res, SUCCESS, data);
  })
);

router.post(
  "/new",
  catchAsync(async (req, res) => {
    const data = await createNewRestaurant(req.body, req.user);
    sendResponse(res, SUCCESS, data);
  })
);

module.exports = router;
