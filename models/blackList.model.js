const mongoose = require("mongoose");

const blackSchema = mongoose.Schema(
  {
    token: { type: String, required: true }
  }
);

const BlackModel = mongoose.model("BlackList", blackSchema);

module.exports = {
    BlackModel
};
