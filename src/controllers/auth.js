const jwt = require("jsonwebtoken");
const users = require("./../repositories/user");
const bcrypt = require("bcryptjs");
const config = require("../config");

exports.register = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await users.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

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
  try {
    const { username, password } = req.body;

    const user = await users.findByUsername({ username });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

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

    return res.status(200).json({
      accessToken,
      refreshToken: refreshTokenHashed,
    });
  } catch (err) {
    next(err);
  }
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
