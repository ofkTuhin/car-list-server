const mongoose = require("mongoose");

module.exports.carSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  model: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
  },
  bookmark: {
    type: mongoose.Schema.Types.ObjectId,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});
