const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const otpGenerator = require('otp-generator');
const methodOverride = require('method-override');
const { saveRedirectURL } = require('../middleware.js');
const transporter = require("../config/mailer");
const userControllers = require("../controllers/users.js");

// Signup Routes
router.route('/signup')
.get(userControllers.renderSignupForm)
.post(wrapAsync(userControllers.signup));

// Login-success-Route
router.get("/login-success", userControllers.renderLoginSuccessForm);

// Login Routes
router.route('/login')
.get(userControllers.renderLoginForm)
.post(saveRedirectURL, passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), userControllers.login);

// Logout Route
router.get('/logout', userControllers.logout);

// Forgot Password Routes
router.route('/forgot-password')
.get(userControllers.renderForgotPasswordForm)
.post(wrapAsync(userControllers.forgotpassword));

// Verify OTP Route
router.post('/verify-otp', wrapAsync(userControllers.verifyotp));

// Reset Password Route
router.post('/reset-password', wrapAsync(userControllers.resetpassword));

router.get("/privacy", (req,res)=>{
    res.render("users/privacy");
});

router.get("/terms", (req,res)=>{
    res.render("users/terms");
});

router.get("/contact", (req,res)=>{
    res.render("users/contact");
});

module.exports = router;