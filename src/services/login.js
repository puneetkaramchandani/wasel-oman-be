const User = require("../models/user");
const { generateToken } = require("../utils");

module.exports = {
  authenticateUser,
};

async function authenticateUser(data, type = "user") {
  const { email, password } = data;
  const user = await User.findAndAuthenticate(email, password, type);
  const accessToken = generateToken(user._id);
  return {
    user,
    accessToken,
  };
}
