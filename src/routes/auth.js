const express = require("express");
const {
  authServices: { authenticate },
} = require("../services");
const {
  catchAsync,
  sendResponse,
  validateSchema,
  userLoginSchema,
} = require("../utils");
const {
  STATUS_CODES: { SUCCESS },
} = require("../constants");

const router = express.Router();

// Authenticate User With Email and Password
router.post(
  "/login",
  catchAsync(async (req, res) => {
    await validateSchema(userLoginSchema, req.body);
    const data = await authenticate(req.body);
    sendResponse(res, SUCCESS, data);
  })
);
// Authenticate User With Email and Password

module.exports = router;
