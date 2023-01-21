const express = require("express");
const {
  loginServices: { authenticateUser },
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
  "/user",
  catchAsync(async (req, res) => {
    await validateSchema(userLoginSchema, req.body);
    const data = await authenticateUser(req.body);
    sendResponse(res, SUCCESS, data);
  })
);
// Authenticate User With Email and Password

// Authenticate User With Email and Password
router.post(
  "/vendor",
  catchAsync(async (req, res) => {
    await validateSchema(userLoginSchema, req.body);
    const data = await authenticateUser(req.body, "vendor");
    sendResponse(res, SUCCESS, data);
  })
);
// Authenticate User With Email and Password

// Authenticate User With Email and Password
router.post(
  "/admin",
  catchAsync(async (req, res) => {
    await validateSchema(userLoginSchema, req.body);
    const data = await authenticateUser(req.body, "admin");
    sendResponse(res, SUCCESS, data);
  })
);
// Authenticate User With Email and Password

module.exports = router;
