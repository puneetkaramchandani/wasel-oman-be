const { expressjwt } = require("express-jwt");

module.exports = jwt;

function jwt() {
  const secret = process.env.JWT_SECRET;
  return expressjwt({ secret, algorithms: ["HS256"], isRevoked }).unless({
    path: [
      {
        url: "/",
        method: ["GET"],
      },
      {
        url: "/login/user",
        method: ["POST"],
      },
      {
        path: "/login/vendor",
        method: ["POST"],
      },
      {
        url: "/login/admin",
        method: ["POST"],
      },
      {
        url: "/user/register",
        method: ["POST"],
      },
      {
        url: "/restaurants",
        method: ["GET"],
      },
      {
        url: /^\/restaurants\/[0-9a-fA-F]{24}$/,
        method: ["GET"],
      },
      {
        url: /^\/restaurants\/[0-9a-fA-F]{24}\/products/,
        method: ["GET"],
      },
      {
        url: "/products",
        method: ["GET"],
      },
      {
        url: "/contactUs",
        method: ["POST"],
      },
    ],
  });
}

async function isRevoked(req, payload, done) {
  done;
}
