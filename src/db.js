const mySql = require("mysql2/promise");
const configs = require("./config");

const connection = mySql.createPool({
  uri: configs.db.dbUri,
  connectionLimit: configs.db.poolSize,
  waitForConnections: true,
});

module.exports = connection;
