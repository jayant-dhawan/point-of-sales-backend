const validateEmail = require('validator').default.isEmail;

const UserModel = require('../model/user');

const successResponse = require("../responses/success");
const errorResponse = require("../responses/error");

module.exports = async function (req, res) {
  const { name, email, password } = req.body;

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer") {
    return res.json(successResponse(null, "User already logged in"));
  }

  //Validations
  if (!name) { return  res.json(errorResponse("EMPTY_FIELD", "Name is required for signup")) }
  if (!email) { return  res.json(errorResponse("EMPTY_FIELD", "Email is required for signup")) }
  if (!validateEmail(email)) { return  res.json(errorResponse("INVALID_EMAIL", "Email is invalid")) }
  if (!password || password.length < 6) { return  res.json(errorResponse("INVALID_PASSWORD", "Password is either empty or less than 6 characters")) }

  try {
    const user = await UserModel.create({ name, email, password });
    if (user) res.json(successResponse(user, "Signup Successfull"));
    else res.json(successResponse(null, "Signup Failed"));
  } catch (error) {
    if (error.code && error.code == 11000) {
      res.json(errorResponse("USER_EXIST", "User already exist, please try logging in."));
    } else {
      res.status(500).json(errorResponse("UNKNOWN_ERROR", "There is some error please try after sometime."));
    }
  }
}