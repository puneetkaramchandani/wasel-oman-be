const User = require("../models/user");
const { generateToken } = require("../utils");

module.exports = {
  createNewUser,
};

async function createNewUser(data) {
  const { email, password, type = "user" } = data;
  await User.checkExistingUser(email);
  const newUser = new User({ email, password, type });
  const token = generateToken(newUser._id);
  await newUser.save();
  newUser.password = undefined;
  return { accessToken: token, user: newUser };
}
