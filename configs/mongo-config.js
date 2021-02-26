const mongoose = require("mongoose");
const db = process.env.DBURL;

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(db);
mongoose.connection.on('connected', function () {
  console.log("database connection established successfully");
});
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error.');
  process.exit();
});

module.exports = mongoose.connection;