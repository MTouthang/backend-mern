const User = require("../models/user"); // user entity from model
const { check, validationResult } = require("express-validator"); // validation

var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  console.log(`This is the errors const: " ${errors}`);

  // check for the error presents or not presents
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0].msg,
    });
  }

  // then save the user
  const user = new User(req.body);
  user.save((err, user) => {
    //check
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB",
      });
    }
    //save
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

//signin
exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body; // destructure of the body

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User email does not exits",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    // create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token"); // clear the cookie whose name is token
  res.json({
    message: "user signout successfully",
  });
};

// protected route
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// custom middleware
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied",
    });
  }
  next();
};
