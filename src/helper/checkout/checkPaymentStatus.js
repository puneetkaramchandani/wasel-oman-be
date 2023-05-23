const cko_client = require("./checkoutClient");

const dotenv = require("dotenv");

dotenv.config();

module.exports = async function checkHostedPaymentStatus(payment_id) {
  const res = await cko_client.payments.get(payment_id);
  return res;
};
