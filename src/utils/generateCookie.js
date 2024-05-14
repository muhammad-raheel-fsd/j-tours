const generateCookie = (res, token, expiry = 30 * 24 * 60 * 60 * 1000) =>
  res.cookie("token", token, { httpOnly: true, maxAge: expiry });

module.exports = generateCookie;
