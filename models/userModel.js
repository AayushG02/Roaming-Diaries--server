const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (username, email, password) {
  if (!username || !email || !password) {
    throw new Error("All fields are required!");
  }
  const usernameExists = await this.findOne({ username });
  if (usernameExists) {
    throw new Error("User already exists!");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Enter a valid e-mail!");
  }
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw new Error("E-mail already exists!");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough!");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash });

  return user;
};

userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw new Error("All fields are required!");
  }
  const user = await this.findOne({ username });
  if (!user) {
    throw new Error("User does not exists!");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Enter correct password!");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
