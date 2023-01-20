const jwt = require("jsonwebtoken");

function generateToken(user_id) {
  const token = jwt.sign({ sub: user_id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
}

module.exports = generateToken;
