const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

//Creating a User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "manager"
  }
});

/**
 * This function will hash the password before 
 * creating a new User Document.
 */
UserSchema.pre(
  'save',
  async function (next) {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
  }
);

/**
 * This will add a method to User Model
 * which will be used to verify the password by
 * comparing it with the password hash saved in the database.
 * Will be used at the time of Login.
 */
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

//Creating a User Model
const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;