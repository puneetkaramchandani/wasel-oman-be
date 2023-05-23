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
  const order = await Order.findById(order_id);
  const payment = await Payment.findOne({ order: order });
  const paymentStatus = await checkHostedPaymentStatus(
    payment.hostedPaymentPageId
  );

  if (paymentStatus.status === "Payment Received") {
    order.status = "confirmed";
    order.secret = Randomatic("0", 4);
    await order.save();
  }

  payment.status = paymentStatus.status;
  await payment.save();

  return;
}

async function checkPaymentStatus() {}

async function updatePaymentStatus() {}

async function rebuildHostedPayment() {}

async function getHostedPaymentDetails() {}

async function getPaymentDetails(order_id) {
  const payment = await Payment.findOne({ order: order_id });
  return payment;
}
