const User = require("../models/User");
const Role = require("../models/Role");
const Rank = require("../models/Rank");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");
const Skin = require("../models/Skin");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,

    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Ошибка при регистрации", errors });
      }
      const { userName, password } = req.body;

      const candidate = await User.findOne({ userName });
      if (candidate) {
        return res.status(400).json({ message: "Пользователь с таким именем уже существует" });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ RoleName: "USER" });
      // const adminRole = await Role.findOne({ RoleName: "ADMIN" });
      const user = new User({ userName, password: hashPassword, roles: userRole.RoleName });

      await user.save();
      return res.json({ message: "Пользователь успешно зарегистрирован" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req, res) {
    try {
      const { userName, password } = req.body;

      const user = await User.findOne({ userName });
      if (!user) {
        return res.status(400).json({ message: `Пользователь с именем ${userName} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Неверный пароль` });
      }
      const token = generateAccessToken(user._id, user.roles);
      console.log(token);
      return res.json({
        token,
        user: {
          id: user.id,
          userName: user.userName,
        },
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error" });
    }
  }

  async auth(req, res) {
    try {
      const user = await User.findOne({ _id: req.user.id });
      const token = generateAccessToken(user._id, user.roles);
      const userRank = await Rank.findOne({ _id: user.rank });
      const userSkins = await Skin.find({ _id: user.skins });
      return res.json({
        token,
        user: {
          id: user.id,
          userName: user.userName,
          skins: userSkins,
          rank: userRank,
        },
      });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {}
  }
}

module.exports = new authController();
