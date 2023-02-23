const express = require("express");
const userController = require("../controller/userController");
const { checkauth } = require("../middlewares/checkAuth");
const userRouter = express.Router();

userRouter
  .route("/")
  .get(checkauth, userController.getAllUser)
  .post(userController.registerUser);
userRouter.post("/login", userController.loginUser);

module.exports = userRouter;
