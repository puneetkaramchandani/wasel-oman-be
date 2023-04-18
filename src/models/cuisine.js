const mongoose = require("mongoose");

const cuisineSchema = new mongoose.Schema(
  {
    origin: {
      trim: true,
      type: "String",
      required: [true, "Origin is required"],
    },
    name: {
      trim: true,
      type: "String",
      required: [true, "Name is required"],
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

module.exports = mongoose.model("Cuisine", cuisineSchema);
