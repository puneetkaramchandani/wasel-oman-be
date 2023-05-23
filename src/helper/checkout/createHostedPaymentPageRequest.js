const cko_client = require("./checkoutClient");

const dotenv = require("dotenv");

dotenv.config();

module.exports = async function createHostedPaymentPageRequest(data = {}) {
  const {
    totalAmount,
    currency = "OMR",
    order_id,
    countryCode = "OM",
    customerName,
    customerEmail,
    payment_type = "Regular",
  } = data;

  const res = await cko_client.hostedPayments.create({
    payment_type: payment_type,
    amount: totalAmount * 1000,
    currency: currency,
    reference: order_id,
    billing: {
      address: {
        country: countryCode,
      },
    },
    customer: {
      name: customerName,
      email: customerEmail,
    },
    success_url: `${process.env.BACKEND_URL}/payment/confirm?order_id=${order_id}`,
    failure_url: `${process.env.BACKEND_URL}/payment/confirm`,
    cancel_url: `${process.env.BASE_URL}/payment?order_id=${order_id}`,
    processing_channel_id: process.env.CHECKOUT_HOSTED_PAGE_PAYMENT_CHANNEL_ID,
  });
  return res;
};
