const { Schema, model } = require("mongoose");

const Rank = new Schema({
  rankName: { type: String, unique: true, required: true },
  rankColor: { type: String, unique: true, required: true },
});

module.exports = model("Rank", Rank);
