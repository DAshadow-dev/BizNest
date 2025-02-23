const jwt = require("jsonwebtoken");

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: "1h",
    issuer: process.env.ISSUER,
  });
};

module.exports = generateToken;
