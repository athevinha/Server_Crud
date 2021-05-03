const mongoose = require("mongoose");
var schema = mongoose.Schema({
  title: String,
  description: String,
  published: Boolean,
});

const Tutorial = mongoose.model("tutorial", schema);
module.exports = Tutorial;
