const { checkExists } = require("../lib/utils");
const { User } = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// get User
module.exports.getAllUser = async (req, res) => {
  const response = (res, err, data) => {
    if (err) {
      res.status(500).json({
        error: "the server side error",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "data get succesfully",
      });
    }
  };
  await User.find({}).exec((err, data) => {
    console.log(data);
    response(res, err, data);
  });
};

// register User
module.exports.registerUser = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email) {
      res.status(401).send({
        success: false,
        error: "data are missing",
      });
    }

    if (checkExists(req, User).length > 0) {
      res.status(400).json({
        success: false,
        message: "This user already exists",
      });
    } else {
      const { name, email, password } = req.body;
      const postData = new User({
        name: name,
        email: email,
        password: await bcrypt.hash(password, 10),
      });
      await postData.save();
      res.status(200).send({
        success: true,
        message: "data added sucessfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      error: "There is server side error",
    });
  }
};
// login user
module.exports.loginUser = async (req, res) => {
  try {
    const isUser = await checkExists(req, User);
    console.log(isUser);
    if (isUser.length > 0) {
      const userValidation = bcrypt.compare(
        req.body.password,
        isUser[0].password
      );
      if (userValidation) {
        const jwtToken = jwt.sign(
          {
            name: isUser[0].name,
            _id: isUser[0]._id,
          },
          process.env.JWT_SECRTE
        );
        res.status(200).json({
          acces_token: jwtToken,
          message: "login success",
        });
      } else {
        res.status(500).json({
          message: "Authentication Failed",
        });
      }
    } else {
      res.status(500).json({
        message: "Authentication Failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Authentication Failed",
    });
  }
};
