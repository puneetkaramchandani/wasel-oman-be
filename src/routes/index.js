const { sendResponse } = require("../utils");
const {
  STATUS_CODES: { SUCCESS, NOT_FOUND },
} = require("../constants");
const { catchAsync, ExpressError } = require("../utils");

const app = (module.exports = require("express")());

app.get(
  "/",
  catchAsync(async (req, res) => {
    return sendResponse(res, SUCCESS, { msg: "Welcome to Wasel" });
  })
);

app.use("/auth", require("./auth"));
app.use("/user", require("./user"));

app.all("*", (req, res, next) => {
  next(new ExpressError(NOT_FOUND.message, NOT_FOUND.code));
});
