const jwt = require("jsonwebtoken");
const users = require("./../repositories/user");
const bcrypt = require("bcryptjs");
const config = require("../config");

exports.register = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    //* Validations req body

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await users.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    console.log("user ->", user);

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      config.auth.accessTokenSecret,
      { expiresIn: config.auth.accessTokenExpiresInSecond + "s" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      config.auth.resreshTokenSecret,
      { expiresIn: config.auth.resreshTokenExpiresInSecond + "s" }
    );
    const refreshTokenHashed = await bcrypt.hash(refreshToken, 12);

    return res.status(201).json({
      accessToken,
      refreshToken: refreshTokenHashed,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  //codes
};

exports.refresh = async (req, res, next) => {
  //codes
};

exports.getMe = async (req, res, next) => {
  //codes
};

exports.logOut = async (req, res, next) => {
  //codes
};
