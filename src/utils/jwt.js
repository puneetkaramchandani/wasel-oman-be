const { expressjwt } = require("express-jwt");

module.exports = jwt;

function jwt() {
  const secret = process.env.JWT_SECRET;
  return expressjwt({ secret, algorithms: ["HS256"], isRevoked }).unless({
    path: [
      "/",
      "/login/user",
      "/login/vendor",
      "/login/admin",
      "/user/register",
      "/restaurants",
      "/contactUs",
      "/products",
    ],
  });
}

async function isRevoked(req, payload, done) {
  done;
}
