const { isEmpty } = require("lodash");
const User = require("../models/user");
const { generateToken, ExpressError } = require("../utils");

module.exports = {
  createNewUser,
  getUserById,
  updateUserDetails,
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
