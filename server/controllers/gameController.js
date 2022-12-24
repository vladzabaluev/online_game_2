const User = require("../models/User");
const Rank = require("../models/Rank");
const Skin = require("../models/Skin");
const Condition = require("../models/Condition");
const Role = require("../models/Role");

class gameController {
  async changeWinCount(req, res) {
    try {
      const winnerName = req.body.userName;
      console.log(winnerName);

      const user = await this.changeWinCountService(winnerName);

      return res.json({
        winUser: user,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Чет не так" });
    }
  }

  async changeNickName(req, res) {
    try {
      const { userName, newUserName } = req.body;

      const user = await User.findOne({ userName });
      if (!user) {
        return res.status(400).json({ message: `Пользователь с именем ${userName} не найден` });
      }
      const tempUser = await User.findOne({ newUserName });
      if (tempUser) {
        return res.status(400).json({ message: `Пользователь с именем ${newUserName} уже существует` });
      }
      user.userName = newUserName;
      user.save();
      const userRank = await Rank.findOne({ _id: user.rank });
      const userSkins = await Skin.find({ _id: user.skins });

      return res.json({
        user: {
          id: user.id,
          userName: user.userName,
          skins: userSkins,
          rank: userRank,
        },
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Чет не так" });
    }
  }

  async constils(req, res) {
    try {
      const beginnerRank = new Condition({
        winConditionCount: 5,
        skin: await Skin.findOne({ skinName: "Начальный" }),
        rank: await Rank.findOne({ rankName: "Beginner" }),
      });
      const middleRank = new Condition({
        winConditionCount: 10,
        skin: await Skin.findOne({ skinName: "Крутой" }),
        rank: await Rank.findOne({ rankName: "Smesharik" }),
      });
      const seniorRank = new Condition({
        winConditionCount: 15,
        skin: await Skin.findOne({ skinName: "Невооброзимый" }),
        rank: await Rank.findOne({ rankName: "Gansta" }),
      });

      //   beginnerRank.save();
      //   middleRank.save();
      //   seniorRank.save();

      res.json({ message: "success" });
    } catch (e) {}
  }

  async changeWinCountService(winnerName) {
    const user = await User.findOne({ userName: winnerName });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: `Пользователь с именем ${winnerName} не найден` });
    }

    user.winCount++;
    await user.save();
    const conditionTrue = await Condition.findOne({ winConditionCount: user.winCount });
    if (conditionTrue) {
      user.rank = conditionTrue.rank;
      if (!user.skins.includes(conditionTrue.skin)) user.skins.push(conditionTrue.skin);
      user.save();
    }
    return user;
  }
}

module.exports = new gameController();
