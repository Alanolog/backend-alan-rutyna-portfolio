const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/index");

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user.tokenInfo = decoded;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid token");
  }
};
module.exports = authenticationMiddleware;
