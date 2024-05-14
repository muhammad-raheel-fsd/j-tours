const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "FOOD_SITE", (err) => {
      if (err) {
        res.render("./templates/loginMessage");
      } else {
        next();
      }
    });
  } else {
    res.render("./templates/loginMessage", { title: "Please login" });
  }
};

module.exports = authMiddleware;
