module.exports.checkExists = async (req, Model) => {
  const authData = await Model.find({ email: req.body.email });
  console.log();
  return authData;
};
