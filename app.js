require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('pino-http')();
const cors = require("cors");

const router = require('./routes');
const mongo = require("./configs/mongo-config");
const errorResponse = require("./responses/error");

const app = express();

app.use(cors({ origin: ['http://localhost:8000', 'http://localhost:8080'] }))
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Setting up router
app.use("/", router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json(errorResponse(err.name, err.message));
  }

  if (err.message === "NOT_AUTHORIZED") {
    return res.status(403).json(errorResponse(err.message, "Do not have permissions to access the endpoint"));
  }

  // other errors
  res.status(err.status || 500);
  res.json(errorResponse(err.name, err.message));
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Running on http://localhost:8000");
});

module.exports = app;
