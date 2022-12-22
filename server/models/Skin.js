const { Schema, model } = require("mongoose");

const Skin = new Schema({
  skinName: { type: String, unique: true, required: true },
  cursorImage: { type: String, unique: true, required: true },
});

module.exports = model("Skin", Skin);
