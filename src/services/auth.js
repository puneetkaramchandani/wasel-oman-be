const User = require("../models/user");
const { generateToken } = require("../utils");

module.exports = {
  authenticate,
};
async function authenticate(data) {
  const { email, password } = data;
  const user = await User.findAndAuthenticate(email, password);
  const accessToken = generateToken(user._id);
  return {
    user,
    accessToken,
  };
}
