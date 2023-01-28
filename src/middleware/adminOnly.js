const { ExpressError } = require("../utils");
const {
  STATUS_CODES: { BAD_REQUEST },
} = require("../constants");

async function adminOnly(req, res, next) {
  if (req.user.type === "admin") {
    next();
  } else {
    throw new ExpressError(BAD_REQUEST.message, BAD_REQUEST.code);
  }
}

module.exports = adminOnly;
