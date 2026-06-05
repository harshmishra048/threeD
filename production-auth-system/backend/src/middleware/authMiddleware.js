const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no access token");
  }

  const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

  const user = await User.findById(decoded.id);

  if (!user) {
    res.status(401);
    throw new Error("User no longer exists");
  }

  if (user.isBlocked) {
    res.status(403);
    throw new Error("Your account is blocked");
  }

  req.user = user;
  next();
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("You are not allowed to access this route");
    }

    next();
  };
};

module.exports = {
  protect,
  authorizeRoles,
};
