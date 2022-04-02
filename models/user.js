// imports || require
const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv5 = require("uuid/v5");

// user schema define using mongoose
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  lastname: {
    type: String,
    maxlength: 32,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },

  usrinfo: {
    type: String,
    trim: true,
  },

  encry_password: {
    type: String,
    required: true,
  },
  salt: String,
  role: {
    type: Number,
    default: 0,
  },

  purchases: {
    type: Array,
    default: [],
  },
});

// virtual: encryption on the fly
// TODO: try getting deep
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv5();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

// defining multiple method for User schema
userSchema.method = {
  //TODO: Yet to be explain
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function (plainpassword) {
    if (!password) return "";
    try {
      return createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {}
  },
};

module.exports = mongoose.model("User", userSchema);
