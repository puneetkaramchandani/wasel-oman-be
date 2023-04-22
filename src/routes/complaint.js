const express = require("express");
const {
  catchAsync,
  sendResponse,
  validateSchema,
  complaintRequestSchema,
} = require("../utils");
const {
  STATUS_CODES: { SUCCESS },
} = require("../constants");
const {
  complaintServices: { getMyComplaints, createNewComplaint },
} = require("../services");
const router = express.Router();

router.get(
  "/",
  catchAsync(async (req, res) => {
    const data = await getMyComplaints(req.user, req.query);
    sendResponse(res, SUCCESS, data);
  })
);

router.post(
  "/",
  catchAsync(async (req, res) => {
    await validateSchema(complaintRequestSchema, req.body);
    const data = await createNewComplaint(req.body, req.user);
    sendResponse(res, SUCCESS, data);
  })
);

// router.put(
//   "/",
//   catchAsync(async (req, res) => {
//     sendResponse(res, SUCCESS, "");
//   })
// );

module.exports = router;
