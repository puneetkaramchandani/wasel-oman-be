const cko_client = require("./checkoutClient");

const dotenv = require("dotenv");

dotenv.config();

module.exports = async function checkHostedPaymentStatus(hosted_payment_page_id) {
  const res = await cko_client.hostedPayments.get(hosted_payment_page_id);
  return res;
};
