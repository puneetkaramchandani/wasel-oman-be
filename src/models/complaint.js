const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    category: {
      trim: true,
      type: String,
      required: [true, "Category is required"],
    },
    subject: {
      trim: true,
      type: String,
      required: [true, "Subject is required"],
    },
    complaint: {
      trim: true,
      type: String,
      required: [true, "Complaint is required"],
    },
    remarks: {
      trim: true,
      type: String,
      default: "",
    },
    status: {
      trim: true,
      type: String,
      default: "open",
      enum: ["open", "closed"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Complaint", complaintSchema);
