const mongoose = require("mongoose");
const {
  STATUS_CODES: { CONFLICT },
} = require("../constants");
const { ExpressError } = require("../utils");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Product name is required"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "Product price is required"],
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: [true, "Restaurant is required"],
    },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
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
      required: [true, "Product type is required"],
      enum: ["veg", "nonVeg"],
    },
    cuisine: {
      type: String,
      trim: true,
      required: [true, "At least one cuisine is required"],
      enum: ["North Indian", "Chinese", "South Indian"],
    },
    feature: {
      type: String,
      trim: true,
      default: "New",
      enum: ["Popular", "Top Rated", "New"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: [
        "Beverages",
        "South Indian",
        "Thali",
        "Rice Bowl",
        "Milkshakes",
        "North Indian",
        "Bread",
        "Prathas",
        "Dessert",
        "Chinese",
        "Combos",
        "Sandwitch",
        "Snacks",
        "Breakfast",
        "Fast Food",
        "Salad",
        "Cakes",
      ],
    },
    images: [
      {
        fileName: {
          trim: true,
          type: String,
          required: [true, "Filename is required"],
        },
        url: {
          trim: true,
          type: String,
          required: [true, "Url is required"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Function
productSchema.statics.checkExistingProduct = async function (
  restaurant,
  product
) {
  const foundProduct = await this.findOne({
    restaurant: restaurant,
    name: product.name,
  });
  if (foundProduct) {
    throw new ExpressError(
      `Product named ${product.name} already exists`,
      CONFLICT.code
    );
  } else {
    return;
  }
};
// Function

module.exports = mongoose.model("Product", productSchema);
