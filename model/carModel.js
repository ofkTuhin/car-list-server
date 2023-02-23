const mongoose = require("mongoose");
const { carSchema } = require("../schema/carSchema");

module.exports.Car = new mongoose.model("Car", carSchema);
