const express = require("express");
const { catchAsync, sendResponse } = require("../utils");
const {
  cuisineServices: {
    getAllCuisines,
    addNewCuisine,
    deleteCuisine,
    editCuisineDetails,
  },
} = require("../services");
const {
  STATUS_CODES: { SUCCESS },
} = require("../constants");
const { adminOnly } = require("../middleware");

const router = express.Router();

/**
 * GET ALL CUISINES
 */
router.get(
  "/",
  catchAsync(async (req, res) => {
    const data = await getAllCuisines();
    sendResponse(res, SUCCESS, data);
  })
);

router.use(
  catchAsync(async (req, res, next) => {
    await adminOnly(req, res, next);
  })
);

router.post(
  "/",
  catchAsync(async (req, res) => {
    const data = await addNewCuisine(req.body);
    sendResponse(res, SUCCESS, data);
  })
);

router.put(
  "/",
  catchAsync(async (req, res) => {
    const data = await editCuisineDetails(req.body);
    sendResponse(res, SUCCESS, data);
  })
);

router.delete(
  "/",
  catchAsync(async (req, res) => {
    const data = await deleteCuisine(req.body);
    sendResponse(res, SUCCESS, data);
  })
);

module.exports = router;
