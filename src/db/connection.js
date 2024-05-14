const sql = require("mysql2");
const dbConnection = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jtoursdb",
});
dbConnection.connect((err) => {
  if (err) console.log(err);
  else console.log("Connection successfull");
});

module.exports = dbConnection;
