const express = require("express");
const router = express.Router();
const validateEmail = require('validator').default.isEmail;
var jwt = require('jsonwebtoken');

const UserModel = require('../model/user');

const successResponse = require("../responses/success");
const errorResponse = require("../responses/error");

router.post('/', async function (req, res, next) {
  const { email, password } = req.body;

  if (!validateEmail(email)) { res.json(errorResponse("INVALID_EMAIL", "Email is invalid")) }
  if (!password) { res.json(errorResponse("INVALID_PASSWORD", "Password is empty")) }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.json(errorResponse("USER_NOT_FOUND", `User with ${email} donot exist please sign up.`));
    }

    const validate = await user.isValidPassword(password);

    if (!validate) {
      res.json(errorResponse("INVALID_PASSWORD", `Email/Password do not match`));
    }

    const token = jwt.sign({ email: user.email, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d', algorithm: "HS256" });

    res.json(successResponse({ token, email: user.email, name: user.name, role: user.role }, "Login Successfull"));

  } catch (error) {
    res.status(500).json(errorResponse("UNKNOWN_ERROR", "There is some error please try after sometime."));
  }
})

module.exports = router;