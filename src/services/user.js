const User = require("../models/user");
const { generateToken } = require("../utils");

module.exports = {
  createNewUser,
  getUserById,
};

async function getUserById(user_id) {
  const user = await User.findById(user_id);
  user.password = undefined;
  return { user };
}

async function createNewUser(data) {
  const { email, password, type = "user", phone } = data;
  await User.checkExistingUser(email);
  const newUser = new User({ email, password, type, phone });
  const token = generateToken(newUser._id);
  await newUser.save();
  newUser.password = undefined;
  return { accessToken: token, user: newUser };
}
