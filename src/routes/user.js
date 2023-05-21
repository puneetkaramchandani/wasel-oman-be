const express = require("express");
const {
  userServices: { createNewUser },
} = require("../services");
const {
  catchAsync,
  sendResponse,
  validateSchema,
  userRegisterSchema,
  updateUserDetailsSchema,
  ExpressError,
} = require("../utils");
const {
  STATUS_CODES: { SUCCESS },
} = require("../constants");
const {
  userServices: {
    getUserById,
    updateUserDetails,
    reSendAccountSetupEmailVerificationRequest,
    verifyEmail
  },
} = require("../services");
const { isEmpty } = require("lodash");

const router = express.Router();

router.get(
  "/me",
  catchAsync(async (req, res) => {
    const data = await getUserById(req.user._id);
    sendResponse(res, SUCCESS, data);
  })
);

router.put(
  "/me",
  catchAsync(async (req, res) => {
    await validateSchema(updateUserDetailsSchema, req.body);
    const data = await updateUserDetails(req.user, req.body);
    sendResponse(res, SUCCESS, data);
  })
);

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

router.get(
  "/verify/email",
  catchAsync(async (req, res) => {
    const { token } = req.query;
    if (isEmpty(token)) {
      throw new ExpressError("Query parameter token not found", 400);
    }
    const data = await verifyEmail(token);
    sendResponse(res, SUCCESS,data);
  })
);

router.get(
  "/verify/email/resend",
  catchAsync(async (req, res) => {
    const data = await reSendAccountSetupEmailVerificationRequest(req.user);
    sendResponse(res, SUCCESS, data);
  })
);

module.exports = router;
