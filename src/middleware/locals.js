const locals = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) res.locals.isLoggedIn = true;
  else res.locals.isLoggedIn = false;

  next();
};
module.exports = locals;
