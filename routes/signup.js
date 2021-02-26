const express = require("express");
const router = express.Router();
const validateEmail = require('validator').default.isEmail;

const UserModel = require('../model/user');

const successResponse = require("../responses/success");
const errorResponse = require("../responses/error");

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) { res.json(errorResponse("EMPTY_NAME", "Name field is empty")) }
  if (!validateEmail(email)) { res.json(errorResponse("INVALID_EMAIL", "Email is invalid")) }
  if (!password || password.length < 6) { res.json(errorResponse("INVALID_PASSWORD", "Password is either empty or less than 6 characters")) }

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
})

module.exports = router;