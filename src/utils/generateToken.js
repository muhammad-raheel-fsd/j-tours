const jwt = require("jsonwebtoken");

const generateToken = (
  payload,
  secret = "JTOURS",
  expiry = 30 * 24 * 60 * 60
) => jwt.sign(payload, secret, { expiresIn: expiry });

module.exports = generateToken;
