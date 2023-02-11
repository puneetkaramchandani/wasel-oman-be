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

app.use("/cart", require("./cart"));
app.use("/user", require("./user"));
app.use("/login", require("./login"));
app.use("/orders", require("./order"));
app.use("/tables", require("./table"));
app.use("/products", require("./product"));
app.use("/restaurants", require("./restaurant"));
app.use("/vendorImageStore", require("./vendorImageStore"));
app.use("/productImageStore", require("./productImageStore"));
app.all("*", (req, res, next) => {
  next(new ExpressError(NOT_FOUND.message, NOT_FOUND.code));
});
