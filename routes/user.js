const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById); // get user by id
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser); // get userby id
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser); // update user info
router.get(
  "/order/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;
