const express = require("express");
const {
  STATUS_CODES: { SUCCESS },
} = require("../constants");
const { vendorOnly, restaurantOnly } = require("../middleware");
const {
  catchAsync,
  sendResponse,
  validateSchema,
  createNewTableSchema,
  updateTableSchema,
  ExpressError,
} = require("../utils");
const {
  tableServices: { getAllTables, createNewTable, updateTableData, deleteTable },
} = require("../services");
const { ObjectId } = require("mongodb");
const router = express.Router();

router.get(
  "/",
  catchAsync(async (req, res) => {
    const data = await getAllTables();
    sendResponse(res, SUCCESS, data);
  })
);

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

router.post(
  "/new",
  catchAsync(async (req, res) => {
    await validateSchema(createNewTableSchema, req.body);
    const data = await createNewTable(req.restaurant, req.body);
    sendResponse(res, SUCCESS, data);
  })
);

router.put(
  "/update",
  catchAsync(async (req, res) => {
    await validateSchema(updateTableSchema, req.body);
    const { tableId } = req.body;
    if (!ObjectId.isValid(tableId)) {
      throw new ExpressError("Invalid table id", 402);
    }
    const data = await updateTableData(req.restaurant, req.body);
    sendResponse(res, SUCCESS, data);
  })
);

router.delete(
  "/delete",
  catchAsync(async (req, res) => {
    const { tableId = null } = req.body;
    if (!ObjectId.isValid(tableId))
      throw new ExpressError("Invalid table id", 402);
    const data = await deleteTable(req.restaurant, req.body);
    sendResponse(res, SUCCESS, data);
  })
);

module.exports = router;
