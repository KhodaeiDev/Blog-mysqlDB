const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "./.env"),
});

module.exports = {
  db: {
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
  },

  port: parseInt(process.env.PORT) || 4000,

  auth: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    resreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenExpiresInSecond: process.env.ACCESS_TOKEN_EXPIRES_IN_SECOND,
    resreshTokenExpiresInSecond: process.env.RESRESH_TOKEN_EXPIRES_IN_SECOND,
  },
};
