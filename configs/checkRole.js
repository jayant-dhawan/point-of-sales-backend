const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer") {
      const user = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
      if (user.role === "admin") {
        next();
      } else {
        //res.statusCode(403);
        throw new Error("NOT_AUTHORIZED");
      }
    }
  } catch (error) {
    //res.statusCode(403);
    throw new Error("NOT_AUTHORIZED");
  }
}