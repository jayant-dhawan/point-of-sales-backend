const express = require("express");
const router = express.Router();
const jwt = require('express-jwt');

const signupRouter = require("./signup");
const loginRouter = require("./login");

router.get('/', jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }), (req, res) => {
  res.json({ message: "SUCCESS" });
});

router.use('/signup', signupRouter);

router.use('/login', loginRouter);

module.exports = router;