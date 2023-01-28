const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      trim: true,
      type: String,
      required: [true, "Restaurant name is required"],
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
        long: {
          trim: true,
          type: String,
          required: [true, "location longitude is required"],
        },
        lat: {
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
        required: [true, "Restaurant open time is required"],
      },
      closeTime: {
        trim: true,
        type: String,
        required: [true, "Restaurant close time is required"],
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
      enum: ["underVerification", "active", "suspended"],
      default:"underVerification"
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
      required: [true, "Restaurant type is required"],
      enum: ["veg", "nonVeg", "veg&NonVeg"],
    },
    cuisines: [
      {
        type: String,
        trim: true,
        required: [true, "At least one cuisine is required"],
        enum: ["North Indian", "Chinese", "South Indian"],
      },
    ],
    category: {
      type: String,
      trim: true,
      default: "New",
      enum: ["Popular", "Top Rated", "New"],
    },
    thumbnail: {
      fileName: {
        type: String,
        default: null,
        required:[true,"Thumbnail filename is required"]
      },
      url: {
        type: String,
        default: null,
        trim: true,
        required:[true,"Thumbnail url is required"]
      },
    },
    logo: {
      fileName: {
        type: String,
        default: null,
        required:[true,"Logo filename is required"]
      },
      url: {
        type: String,
        default: null,
        trim: true,
        required:[true,"Logo url is required"]
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
