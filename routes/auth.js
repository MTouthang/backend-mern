const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be atleast 3 char").isLength({ min: 3 }),
  ],
  signup
);
router.get("/signout", signout);

module.exports = router;
