const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "./.env"),
});

module.exports = {
  db: {
    dbUri: process.env.DB_URI,
    poolSize: process.env.POOL_SIZE || 10,
  },

  port: parseInt(process.env.PORT) || 4000,

  auth: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    resreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenExpiresInSecond: process.env.ACCESS_TOKEN_EXPIRES_IN_SECOND,
    resreshTokenExpiresInSecond: process.env.RESRESH_TOKEN_EXPIRES_IN_SECOND,
  },
};
