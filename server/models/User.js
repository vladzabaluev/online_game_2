const { Schema, model, Types } = require("mongoose");

const User = new Schema({
  userName: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  skins: [{ type: Types.ObjectId, ref: "Skin" }],
  rank: { type: Types.ObjectId, ref: "Rank" },
  winCount: { type: Number, default: 0 },
  roles: [{ type: String, ref: "Role" }],
});

module.exports = model("User", User);
