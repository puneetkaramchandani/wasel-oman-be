const mongoose = require("mongoose");
const {
  STATUS_CODES: { CONFLICT },
} = require("../constants");
const { ExpressError } = require("../utils");

const tableSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: [true, "Number is required"],
    },
    price: {
      min: 0,
      type: Number,
      required: [true, "Capacity is required"],
    },
    capacity: {
      min: 1,
      type: Number,
      required: [true, "Capacity is required"],
    },
    status: {
      type: String,
      trim: true,
      enum: ["free", "occupied"],
      default: "free",
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: [true, "Restaurant is required"],
    },
  },
  { timestamps: true }
);

// Function
tableSchema.statics.checkExistingTable = async function (
  restaurant,
  tableNumber
) {
  const foundTable = await this.findOne({
    restaurant: restaurant._id,
    number: tableNumber,
  });
  if (foundTable) {
    throw new ExpressError(
      `Table number ${tableNumber} already exists`,
      CONFLICT.code
    );
  } else {
    return;
  }
};
// Function

module.exports = mongoose.model("Table", tableSchema);
