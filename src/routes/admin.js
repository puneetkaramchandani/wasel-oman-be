const express = require("express");
const {
  catchAsync,
  sendResponse,
  validateSchema,
  editComplaintRequestSchema,
  ExpressError,
} = require("../utils");
const {
  complaintServices: { getAllComplaints, editComplaint },
} = require("../services");
const {
  STATUS_CODES: { SUCCESS },
} = require("../constants");
const { adminOnly } = require("../middleware");
const { ObjectId } = require("mongodb");
const router = express.Router();

router.use(
  catchAsync(async (req, res, next) => {
    await adminOnly(req, res, next);
  })
);

router.get(
  "/complaint",
  catchAsync(async (req, res) => {
    const data = await getAllComplaints(req.query);
    sendResponse(res, SUCCESS, data);
  })
);

router.put(
  "/complaint",
  catchAsync(async (req, res) => {
    if (!ObjectId.isValid(req.body.complaint_id)) {
      throw new ExpressError("Invalid complaint id", 400);
    }
    await validateSchema(editComplaintRequestSchema, req.body);
    const data = await editComplaint(req.body);
    sendResponse(res, SUCCESS, data);
  })
);

module.exports = router;
