const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      trim: true,
      required: [true, "Status is required"],
      default: "Payment Pending",
    },
    hostedPaymentPageId: {
      type: String,
      trim: true,
      required: [true, "Hosted payment page id required"],
    },
    paymentPageLinkPublic: {
      type: String,
      trim: true,
      required: [true, "Public payment page link is required"],
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Order reference is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
