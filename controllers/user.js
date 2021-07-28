const fs = require("fs/promises");
const path = require("path");
const User = require("../repositories/user");

const {
  Status,
  HttpCode,
  Message,
  createResponse,
} = require("../helpers/task");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res, next) => {
  try {
    const user = await User.findByEmail(req.body.email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json(
        createResponse(Status.ERROR, HttpCode.CONFLICT, {
          message: Message.EMAIL_USE,
        })
      );
    }
    const { id, name, email, avatar } = await User.create(req.body);
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
    await User.updateToket(id, token);
    res.status(HttpCode.CREATER).json(
      createResponse(Status.SUCCESS, HttpCode.CREATER, {
        data: { id, name, email, avatar, token },
      })
    );
  } catch (e) {
    next(e);
  }
};
const login = async (req, res, next) => {
  try {
    const user = await User.findByEmail(req.body.email);
    const isValidPass = await user?.isValidPassword(req.body.password);
    if (!user || !isValidPass) {
      return res.status(HttpCode.UNAUTHORIZED).json(
        createResponse(Status.ERROR, HttpCode.UNAUTHORIZED, {
          message: Message.INVALID__DATA,
        })
      );
    }
    const { id, name, avatar, email } = user;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
    await User.updateToket(id, token);
    res.status(HttpCode.OK).json(
      createResponse(Status.SUCCESS, HttpCode.OK, {
        data: { id, token, name, email, avatar },
      })
    );
  } catch (e) {
    next(e);
  }
};
const logout = async (req, res, next) => {
  try {
    const id = req.user.id;
    await User.updateToket(id, null);
    res.status(HttpCode.NO_CONTENT).json({});
  } catch (e) {
    next(e);
  }
};

const current = async (req, res, next) => {
  try {
    const id = await req.user._id;
    const user = await User.findByID(id);
    if (user) {
      res
        .status(HttpCode.OK)
        .json(createResponse(Status.SUCCESS, HttpCode.SUCCESS, { data: user }));
    }

    res
      .status(HttpCode.UNAUTHORIZED)
      .json(Status.UNAUTHORIZED, HttpCode.UNAUTHORIZED, {
        message: Message.UNAUTHORIZED,
      });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  register,
  login,
  logout,
  current,
};
