const express = require("express");
const dbConnection = require("../db/connection");
const generateToken = require("../utils/generateToken");
const generateCookie = require("../utils/generateCookie");
const locals = require("../middleware/locals");
// const authentication = require("../middleware/authentication");
const pagesRouter = express.Router();

pagesRouter.get("*", locals);

pagesRouter.get("/", async (req, res) => {
  res.render("./pages/index", { title: "Home" });
});
pagesRouter.get("/about", async (req, res) => {
  const select = `SELECT * FROM team`;
  dbConnection.query(select, (err, result) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.render("./pages/about", { title: "About", members: result });
    }
  });
});
pagesRouter.get("/contact", async (req, res) => {
  res.render("./pages/contact", { title: "Contact" });
});
pagesRouter.get("/services", async (req, res) => {
  res.render("./pages/services", { title: "Services" });
});

pagesRouter.get("/login", async (req, res) => {
  res.render("./pages/login", { title: "Login" });
});

pagesRouter.get("/signup", async (req, res) => {
  res.render("./pages/signup", { title: "Signup" });
});

pagesRouter.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const insert = `INSERT INTO users VALUES ('','${username}' , '${email}', '${password}')`;
    dbConnection.query(insert, (err) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json({
          redirect: "/login",
        });
      }
    });
  } catch (error) {}
});

pagesRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const select = `SELECT * FROM users WHERE email = '${email}'`;
    dbConnection.query(select, (err, result) => {
      if (err) {
        res.json({ message: err.message });
      } else if (result.length == 0) {
        res.json({
          redirect: "/login",
        });
      } else {
        if (result[0].password === password) {
          const token = generateToken({ email: result[0].email });
          generateCookie(res, token);
          res.json({
            redirect: "/",
          });
        } else {
          res.json({
            message: "Invalid password",
          });
        }
      }
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

pagesRouter.get("/logout", async (req, res) => {
  try {
    generateCookie(res, "", 0.1);
    res.json({
      redirect: "/login",
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

module.exports = pagesRouter;
