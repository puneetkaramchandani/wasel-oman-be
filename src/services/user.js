const { isEmpty, startCase } = require("lodash");
const User = require("../models/user");
const { generateToken, ExpressError } = require("../utils");
const { sendEmailVerificationMail } = require("../helper/mailjet");
const jwt = require("jsonwebtoken");

module.exports = {
  createNewUser,
  getUserById,
  updateUserDetails,
  verifyEmail,
  reSendAccountSetupEmailVerificationRequest,
};

async function getUserById(user_id) {
  const user = await User.findById(user_id);
  user.password = undefined;
  return { user };
}

async function createNewUser(data) {
  const { email, password, type = "user", phone } = data;
  await User.checkExistingUserEmail(email);
  await User.checkExistingUserPhone(phone);
  const newUser = new User({ email, password, type, phone });
  const token = generateToken(newUser._id);
  await newUser.save();
  await sendAccountSetupEmailVerificationRequest(
    email,
    "User",
    `${startCase(type)} Sign Up`
  );
  newUser.password = undefined;
  return { accessToken: token, user: newUser };
}

async function updateUserDetails(user, data) {
  await checkIfUserDoesNotExists(user);
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { ...data },
    { new: true, runValidators: true }
  );

  return { user: updatedUser };
}

async function checkIfUserDoesNotExists(userData) {
  const user = await User.findById(userData._id);
  if (isEmpty(user)) throw new ExpressError("User not found", 403);
  else return;
}

async function sendAccountSetupEmailVerificationRequest(
  email,
  name = "User",
  action_type
) {
  const base_url = process.env.BASE_URL;
  const email_verification_token = generateToken(email);
  const confirm_email_link = `${base_url}/verifyEmail?token=${email_verification_token}`;
  await sendEmailVerificationMail(
    email,
    name,
    base_url,
    confirm_email_link,
    action_type
  );
  return;
}

async function reSendAccountSetupEmailVerificationRequest(user) {
  if (user?.isEmailVerified) {
    throw new ExpressError("Email already verified", 400);
  } else
    await sendAccountSetupEmailVerificationRequest(
      user.email,
      "User",
      `${startCase(user?.type)} Sign Up`
    );
  return {};
}

async function verifyEmail(token) {
  let sub = "";
  try {
    sub = jwt.decode(token).sub;
  } catch (e) {
    throw new ExpressError("Invalid token", 400);
  }
  const user = await User.findOne({ email: sub });
  if (isEmpty(user)) {
    throw new ExpressError("User not found", 400);
  } else if (user.isEmailVerified) {
    throw new ExpressError("Email already verified", 400);
  } else {
    await User.findOneAndUpdate(
      { email: sub },
      { isEmailVerified: true },
      { runValidators: true }
    );
  }

  return {};
}
