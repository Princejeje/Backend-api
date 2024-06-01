const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  // Get auth token
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({
      message: "No token provided",
    });
  }
  const JWTToken = token.split(" ").pop();

  try {
    // Verify Token
    const data = jwt.verify(JWTToken, "asdasda");

    const user = await User.findByPk(data.data.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message: "Incorrect credentials",
    });
  }
};
