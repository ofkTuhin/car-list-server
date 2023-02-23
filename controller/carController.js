const { models } = require("mongoose");
const { checkExists } = require("../lib/utils");
const { Car } = require("../model/carModel");

// get Car
module.exports.getAllCar = async (req, res) => {
  const { user } = req.headers;
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
  await Car.find({ email: user }).exec((err, data) => {
    response(res, err, data);
  });
  console.log("success");
};

// post Car
module.exports.postCar = async (req, res) => {
  console.log(req.body);
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(401).json({
      success: false,
      error: "data are missing",
    });
  }
  const carData = {
    ...req.body,
    role: "car",
  };

  if (checkExists(req, Car)) {
    res.status(409).json({
      success: false,
      message: "This email already exists",
    });
  } else {
    const postData = new Car(carData);

    postData.save(carData, (error) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          error: "There is server side error",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "data added sucessfully",
        });
      }
    });
  }
};

// update car
module.exports.updateCarProperty = async (req, res) => {
  await Car.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        model: req.body.model,
        price: req.body.price,
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "the server side error",
        });
      } else {
        res.status(200).json({
          message: "update car succesfully",
        });
      }
    }
  ).clone();
};

//bookmark car
module.exports.bookmarkCar = async (req, res) => {
  await Car.updateOne(
    { _id: req.params.id },
    {
      $cond: {
        if: [req.body.bookmark, true],
        then: {
          $addToSet: { bookmark: req.body.user },
          else: {
            $pull: {
              bookmark: req.body.user,
            },
          },
        },
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "the server side error",
        });
      } else {
        res.status(200).json({
          message: "update car succesfully",
        });
      }
    }
  ).clone();
};

// delete car
module.exports.deleteCar = async (req, res) => {
  await Car.findByIdAndDelete(req.params.id)
    .then((car) => {
      if (!car) {
        return res.status(404).send();
      }

      res.send(car);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
