const { isEmpty } = require("lodash");
const { checkHostedPaymentStatus } = require("../helper/checkout");
const Order = require("../models/order");
const Payment = require("../models/payment");
const Randomatic = require("randomatic");

module.exports = {
  createNewPayment,
  getPaymentDetails,
  confirmPayment,
};

async function createNewPayment(data) {
  const {
    amount,
    currency = "OMR",
    payment_type = "Regular",
    payment_ip,
    reference,
    description,
    processing_channel_id,
    customer: { email, name },
  } = data;
}

async function confirmPayment(order_id) {
  let isPaymentReadSuccessfully = false;
  let paymentStatus = {};

  const order = await Order.findById(order_id);
  const payment = await Payment.findOne({ order: order });

  try {
    paymentStatus = await checkHostedPaymentStatus(payment.hostedPaymentPageId);
    isPaymentReadSuccessfully = true;
  } catch (e) {
    console.log(e);
    isPaymentReadSuccessfully = false;
  }

  if (paymentStatus.status === "Payment Received") {
    order.status = "confirmed";
    order.secret = Randomatic("0", 4);
    await order.save();
  }

  if (!isEmpty(paymentStatus)) {
    payment.status = paymentStatus.status;
    await payment.save();
  }

  return isPaymentReadSuccessfully;
}

async function checkPaymentStatus() {}

async function updatePaymentStatus() {}

async function rebuildHostedPayment() {}

async function getHostedPaymentDetails() {}

async function getPaymentDetails(order_id) {
  const payment = await Payment.findOne({ order: order_id });
  return payment;
}
