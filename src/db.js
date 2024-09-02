const mySql = require("mysql2");
const configs = require("./config");

const connection = mySql.createConnection({
  host: configs.db.host,
  port: configs.db.port,
  user: configs.db.user,
  password: configs.db.password,
  database: configs.db.name,
});

connection.connect((err) => {
  if (err) throw err;

  console.log("Connected to db Successfully");
});

module.exports = connection;
