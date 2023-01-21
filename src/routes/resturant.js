const express = require("express");
const {
  STATUS_CODES: { SUCCESS },
} = require("../constants");

const { catchAsync, sendResponse } = require("../utils");
const {
  resturantServices: { getAllResturants, createNewResturant },
} = require("../services");

const router = express.Router();

router.get(
  "/",
  catchAsync(async (req, res) => {
    const data = await getAllResturants();
    sendResponse(res, SUCCESS, data);
  })
);

router.post(
  "/",
  catchAsync(async (req, res) => {
    const data = await createNewResturant(req.body);
    sendResponse(res, SUCCESS, data);
  })
);

module.exports = router;
