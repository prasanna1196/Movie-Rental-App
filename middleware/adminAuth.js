const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    const isAdmin = await User.findById(decoded.id);
    if (isAdmin.role === "admin") {
      req.user = decoded.id;
    }
    // else if (isAdmin.role === "customer") {
    //   console.log(typeof isAdmin.role);
    //   req.user = decoded;
    // } else {
    //   res.status(401).send("You are not admin");
    // }
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
