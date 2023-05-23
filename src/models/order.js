const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product is required"],
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
        },
      },
    ],
    tables: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
        required: [true, "Table is required"],
      },
    ],
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: [true, "Restaurant is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total Amount is required"],
    },
    status: {
      type: String,
      trim: true,
      enum: ["pending", "confirmed", "completed"],
      default: "pending",
    },
    bookingDetails: {
      firstName: {
        type: String,
        trim: true,
        required: [true, "First name is required"],
      },
      lastName: {
        type: String,
        trim: true,
        required: [true, "Last name is required"],
      },
      phone: {
        code: {
          type: String,
          trim: true,
          required: [true, "Phone code is required"],
        },
        phone: {
          type: String,
          trim: true,
          required: [true, "Phone code is required"],
        },
      },
      email: {
        trim: true,
        type: String,
        required: [true, "Email is required"],
      },
      date: {
        type: Date,
        required: [true, "Date is required"],
      },
      time: {
        type: String,
        trim: true,
        required: [true, "Time is required"],
      },
      request: {
        type: String,
        trim: true,
        default: null,
      },
    },
    orderNo: {
      trim: true,
      type: String,
      required: [true, "Order number is required"],
    },
    secret: {
      type: Number,
      // required: [true, "Order secret is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
