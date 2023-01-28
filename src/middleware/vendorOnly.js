const { ExpressError } = require("../utils");
const {
  STATUS_CODES: { BAD_REQUEST },
} = require("../constants");

async function vendorOnly(req, res, next) {
  if (req.user.type === "vendor") {
    next();
  } else {
    throw new ExpressError(BAD_REQUEST.message, BAD_REQUEST.code);
  }
}

module.exports = vendorOnly;
