var express = require('express');
var router = express.Router();

const User = require('../../APIController/V1/User.js');

//Routes For User Table = 
router.post('/User/UserSignUp', User.UserSignUp);
router.post('/User/UserLogin', User.UserLogin);
router.post('/User/UserLogOut', User.UserLogOut);
router.post('/User/ForgotPassword', User.ForgotPassword);

module.exports = router;