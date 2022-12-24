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
        user.skins.push(conditionTrue.skin);
        user.save();
      }

      return res.json({
        winUser: user,
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
}

module.exports = new gameController();
