const { Checkout } = require("checkout-sdk-node");
const dotenv = require("dotenv");

dotenv.config();

module.exports = cko_client = new Checkout(process.env.CHECKOUT_SECRET_KEY, {
  environment: process.env.CHECKOUT_ENVIRONMENT,
  pk:process.env.CHECKOUT_PUBLIC_KEY
});
