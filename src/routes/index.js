const {
  sendResponse,
  contactUsQuerySchema,
  validateSchema,
} = require("../utils");
const {
  STATUS_CODES: { SUCCESS, NOT_FOUND },
} = require("../constants");
const { catchAsync, ExpressError } = require("../utils");
const { createContactUsQuery } = require("../services");

const app = (module.exports = require("express")());

app.get(
  "/",
  catchAsync(async (req, res) => {
    return sendResponse(res, SUCCESS, { msg: "Welcome to Wasel" });
  })
);

app.post(
  "/contactUs",
  catchAsync(async (req, res) => {
    await validateSchema(contactUsQuerySchema, req.body);
    const data = await createContactUsQuery(req.body);
    sendResponse(res, SUCCESS, data);
  })
);

app.use("/user", require("./user"));
app.use("/login", require("./login"));
app.use("/resturant", require("./resturant"));

app.all("*", (req, res, next) => {
  next(new ExpressError(NOT_FOUND.message, NOT_FOUND.code));
});
