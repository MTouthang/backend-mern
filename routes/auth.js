const express = require("express"); // express
const router = express.Router(); // express router
const { check, validationResult } = require("express-validator"); // validation
const { signout, signup, signin, isSignedIn } = require("../controllers/auth"); // import from auth

router.post(
  "/signup",
  [
    // check and validation
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be atleast 3 char").isLength({ min: 3 }),
  ],
  signup
);

// signin route
router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({
      min: 1,
    }),
  ],
  signin
);
router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
  res.json(req.auth);
});

module.exports = router;
