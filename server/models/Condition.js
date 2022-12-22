const { Schema, model, Types } = require("mongoose");

const Condition = new Schema({
  winConditionCount: { type: Number, unique: true, required: true },
  skin: { type: Types.ObjectId, ref: "Skin" },
  rank: { type: Types.ObjectId, ref: "Rank" },
});

module.exports = model("Condition", Condition);
