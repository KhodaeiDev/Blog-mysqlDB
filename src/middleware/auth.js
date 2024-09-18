const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(accessToken, config.auth.accessTokenSecret);

    if (decoded) {
      req.user = decoded;
      next();
    }
  } catch (err) {
    return res
      .status(401)
      .json("You dont access this route, Please Login first");
  }
};
