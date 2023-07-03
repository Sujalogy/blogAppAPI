const express = require('express');
const userRouter = express.Router();

const { userRegister, userLogin, logoutUser } = require("../controller/user.controller");
const { auth } = require("../middlewares/auth.middleware")
const { blackListing } = require("../middlewares/blacklist.middleware")

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/logout", auth, blackListing, logoutUser);

module.exports = {
    userRouter
}

