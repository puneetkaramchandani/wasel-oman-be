const express = require("express");
const { catchAsync } = require("../utils");
const {
  paymentServices: { confirmPayment },
} = require("../services");

const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

router.get(
  "/confirm",
  catchAsync(async (req, res) => {
    const { order_id } = req.query;
    const isPaymentReadSuccessfully = await confirmPayment(order_id);

    if (isPaymentReadSuccessfully)
      res.redirect(`${process.env.BASE_URL}/payment?order_id=${order_id}`);
    else
      res.redirect(
        `${process.env.BACKEND_URL}/payment/confirm?order_id=${order_id}`
      );
  })
);

module.exports = router;
