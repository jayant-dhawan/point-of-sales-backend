const express = require("express");
const router = express.Router();
const jwt = require('express-jwt');

const signupController = require("../controller/signup");
const loginController = require("../controller/login");

router.get('/', jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }), (req, res) => {
  res.json({ message: "SUCCESS" });
});

router.use('/signup', signupController);

router.use('/login', loginController);

module.exports = router;