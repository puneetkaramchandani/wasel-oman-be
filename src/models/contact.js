const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      trim: true,
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      trim: true,
      type: String,
      require: [true, "Email is required"],
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
    message: {
      trim: true,
      type: String,
      required: [true, "Message is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
