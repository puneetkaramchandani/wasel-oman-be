const express = require("express");
const {
  catchAsync,
  sendResponse,
  validateSchema,
  addNewLocationSchema,
  updateLocationDetailsSchema,
  ExpressError,
} = require("../utils");
const { adminOnly } = require("../middleware");
const {
  locationServices: {
    getAllLocations,
    addNewLocation,
    updateLocationDetails,
    deleteLocation,
  },
} = require("../services");
const {
  STATUS_CODES: { SUCCESS },
} = require("../constants");
const { ObjectId } = require("mongodb");
const router = express.Router();

//

router.get(
  "/",
  catchAsync(async (req, res) => {
    const data = await getAllLocations(req.query);
    sendResponse(res, SUCCESS, data);
  })
);

//
router.use(
  catchAsync(async (req, res, next) => {
    await adminOnly(req, res, next);
  })
);

router.post(
  "/",
  catchAsync(async (req, res) => {
    await validateSchema(addNewLocationSchema, req.body);
    const data = await addNewLocation(req.body);
    sendResponse(res, SUCCESS, data);
  })
);

router.put(
  "/",
  catchAsync(async (req, res) => {
    await validateSchema(updateLocationDetailsSchema, req.body);
    if (!ObjectId.isValid(req.body.location_id)) {
      throw new ExpressError("Invalid location id", 400);
    }
    const data = await updateLocationDetails(req.body);
    sendResponse(res, SUCCESS, data);
  })
);

router.delete(
  "/",
  catchAsync(async (req, res) => {
    const data = await deleteLocation(req.body);
    sendResponse(res, SUCCESS, data);
  })
);

module.exports = router;
