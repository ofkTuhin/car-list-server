const express = require("express");
const carController = require("../controller/carController");
const carRouter = express.Router();

carRouter.route("/").get(carController.getAllCar).post(carController.postCar);

module.exports = carRouter;
