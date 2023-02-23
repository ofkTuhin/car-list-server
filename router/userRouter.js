const express = require("express");
const userController = require("../controller/userController");
const userRouter = express.Router();

userRouter
  .route("/")
  .get(userController.getAllUser)
  .post(userController.registerUser);

module.exports = userRouter;
