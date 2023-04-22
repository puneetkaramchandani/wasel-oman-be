const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    country: {
      trim: true,
      type: String,
      required: [true, "Country is required"],
    },
    city: {
      trim: true,
      type: String,
      required: [true, "City is required"],
    },
    thumbnail: {
      fileName: {
        type: String,
        default: null,
        required: [true, "Thumbnail filename is required"],
      },
      url: {
        type: String,
        default: null,
        trim: true,
        required: [true, "Thumbnail url is required"],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Location", locationSchema);
