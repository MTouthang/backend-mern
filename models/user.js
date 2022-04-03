// imports || require
const mongoose = require("mongoose");
const crypto = require("crypto");
// const uuidv5 = require("uuid/v5");
const { v4: uuid4 } = require("uuid");

// user schema define using mongoose
var userSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

// virtual: encryption on the fly
// TODO: try getting deep
userSchema
  .virtual("password") // create a virtual property `password` with setter and getter
  .set(function (password) {
    this._password = password;
    this.salt = uuid4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

// creating schema method - multiple
userSchema.methods = {
  //TODO: Yet to be explain
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
