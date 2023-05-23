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
        url: "/login/admin",
        method: ["POST"],
      },
      {
        url: "/login/vendor",
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
        url: "/tables",
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
        url: /^\/restaurants\/[0-9a-fA-F]{24}\/tables/,
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
      {
        url: "/cuisine",
        method: ["GET"],
      },
      {
        url: "/location",
        method: ["GET"],
      },
      {
        url: "/user/verify/email",
        method: ["GET"],
      },
      {
        url: "/payment/confirm",
        method: ["GET"],
      },
    ],
  });
}

async function isRevoked(req, payload, done) {
  done;
}
