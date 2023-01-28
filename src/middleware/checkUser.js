const jwt = require("jsonwebtoken");
const {
  userServices: { getUserById },
} = require("../services");

async function checkUser(req, res, next) {
  const tokenHeader = req.header("Authorization");
  if (tokenHeader) {
    let token = tokenHeader.split(" ")[1];
    const { sub = "" } = jwt.decode(token);
    if (sub) {
      const { user } = await getUserById(sub);
      req.user = user;
    }
  }
  next();
}

module.exports = checkUser;
