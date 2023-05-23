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
    await confirmPayment(order_id);
    res.redirect(`${process.env.BASE_URL}/payment?order_id=${order_id}`);
  })
);

module.exports = router;
