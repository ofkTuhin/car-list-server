const mongoose = require("mongoose");
const { userSchema } = require("../schema/userSchema");

module.exports.User = new mongoose.model("User", userSchema);
