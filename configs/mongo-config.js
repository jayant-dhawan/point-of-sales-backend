const mongoose = require("mongoose");
const db = process.env.DBURL;

const UserModel = require("../model/user");

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(db);
mongoose.connection.on('connected', async function () {
  console.log("database connection established successfully");

  const user = await UserModel.countDocuments({ role: "admin" });

  if (user == 0) {

    const newAdmin = {
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "admin"
    };

    try {
      if (!newAdmin.email || !newAdmin.password) {
        console.log("Please add Admin Email and Password to the .env file");
      }

      await UserModel.create(newAdmin);
      console.log("Admin Created");
    } catch (error) {
      console.log(error);
      console.log("Error creating new admin");
    }
  }

});
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error.');
  process.exit();
});

module.exports = mongoose.connection;