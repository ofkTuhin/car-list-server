const jwt = require("jsonwebtoken");

module.exports.checkauth = (req, res, next) => {
  // console.log(req.headers);
  const { authorizetoken } = req.headers;
  // console.log(authorizetoken);
  try {
    const token = authorizetoken.split(" ")[1];
    console.log(process.env.JWT_SECRTE);
    const decode = jwt.verify(token, process.env.JWT_SECRTE);
    const { userName, userId } = decode;
    req.userId = userId;
    req.userName = userName;
    next();
  } catch (err) {
    next("Authentication Failed");
  }
};
