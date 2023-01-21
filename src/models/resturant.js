const mongoose = require("mongoose");

const resturantSchema = new mongoose.Schema(
  {
    name: {
      trim: true,
      type: String,
      required: [true, "Resturant name is required"],
    },
    address: {
      line: {
        type: String,
        trim: true,
        required: [true, "Address line is required"],
      },
      locality: {
        type: String,
        trim: true,
        required: [true, "Locality is required"],
      },
      location: {
        longitude: {
          trim: true,
          type: String,
          required: [true, "location longitude is required"],
        },
        latitude: {
          trim: true,
          type: String,
          required: [true, "location latitude is required"],
        },
      },
    },
    service: {
      daysOff: [
        {
          type: String,
          trim: true,
          enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        },
      ],
      openTime: {
        trim: true,
        type: String,
        required: [true, "Resturant open time is required"],
      },
      closeTime: {
        trim: true,
        type: String,
        required: [true, "Resturant close time is required"],
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    status: {
      trim: true,
      type: String,
      required: [true, "Resturant status is required"],
    },
    rating: {
      type: Number,
      trim: true,
      min: 0,
      max: 5,
      default: 0,
    },
    reviewCount: {
      type: Number,
      trim: true,
      min: 0,
      default: 0,
    },
    type: {
      type: String,
      trim: true,
      required: [true, "Resturant type is required"],
      enum: ["veg", "nonVeg", "veg&NonVeg"],
    },
    categories: [
      {
        type: String,
        trim: true,
        required: [true, "At least one category is required"],
        enum: ["North Indian", "Chinese", "South Indian"],
      },
    ],
    thumbnail: {
      fileName: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
        trim: true,
      },
    },
    logo: {
      fileName: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resturant", resturantSchema);
