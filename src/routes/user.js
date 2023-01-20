const express = require("express");
const {
  userServices: { createNewUser },
} = require("../services");
const {
  catchAsync,
  sendResponse,
  validateSchema,
  userRegisterSchema,
} = require("../utils");
const {
  STATUS_CODES: { SUCCESS },
} = require("../constants");
const router = express.Router();

// Authenticate User With Email and Password
router.post(
  "/register",
  catchAsync(async (req, res) => {
    await validateSchema(userRegisterSchema, req.body);
    const data = await createNewUser(req.body);
    sendResponse(res, SUCCESS, data);
  })
);
// Authenticate User With Email and Password

module.exports = router;
