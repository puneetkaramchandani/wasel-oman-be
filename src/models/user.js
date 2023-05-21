const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { ExpressError } = require("../utils");
const {
  STATUS_CODES: {
    USER_NOT_DEFINED,
    PASSWORD_INCORRECT,
    USER_ALREADY_EXISTS,
    PHONE_NO_ALREADY_IN_USE,
  },
} = require("../constants");

const userSchema = new mongoose.Schema(
  {
    email: {
      trim: true,
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
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
        unique: true,
        required: [true, "Phone code is required"],
      },
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      trim: true,
      type: String,
      required: [true, "Password is required"],
    },
    type: {
      trim: true,
      type: String,
      enum: ["user", "vendor", "admin"],
      require: [true, "User type is required"],
    },
    firstName: {
      type: String,
      trim: true,
      default: null,
    },
    lastName: {
      type: String,
      trim: true,
      default: null,
    },
    gender: {
      enum: [null, "M", "F", "O"],
      default: null,
      type: String,
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Function to encrypt the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
// Function to encrypt the password

// Function to authenticate
userSchema.statics.findAndAuthenticate = async function (
  email,
  password,
  type = "user"
) {
  const foundUser = await this.findOne({ email });
  if (!foundUser || foundUser.type != type) {
    throw new ExpressError(USER_NOT_DEFINED.message, USER_NOT_DEFINED.code);
  }

  const isValid = await bcrypt.compare(password, foundUser.password);

  if (isValid) {
    foundUser.password = undefined;
    return foundUser;
  } else {
    throw new ExpressError(PASSWORD_INCORRECT.message, PASSWORD_INCORRECT.code);
  }
};
// Function to authenticate

// Function to create a new user
userSchema.statics.checkExistingUserEmail = async function (email) {
  const foundUser = await this.findOne({ email });
  if (foundUser) {
    throw new ExpressError(
      USER_ALREADY_EXISTS.message,
      USER_ALREADY_EXISTS.code
    );
  } else {
    return;
  }
};
userSchema.statics.checkExistingUserPhone = async function (phone) {
  const foundUser = await this.findOne({ phone });
  if (foundUser) {
    throw new ExpressError(
      PHONE_NO_ALREADY_IN_USE.message,
      PHONE_NO_ALREADY_IN_USE.code
    );
  } else {
    return;
  }
};
// Function to create a new user

module.exports = mongoose.model("User", userSchema);
