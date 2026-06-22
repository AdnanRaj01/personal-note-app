const Note = require("../models/note");
const Review = require('../models/review.js');
const User = require('../models/user.js');
const otpGenerator = require("otp-generator");
const transporter = require("../config/mailer");

module.exports.renderSignupForm =  (req, res) => {
    res.render('users/signup.ejs');
};

module.exports.signup =  async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        let newUser = new User({
            username,
            email
        });
        const registeredUser = await User.register(
            newUser,
            password
        );
        console.log("Registered User:", registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
             req.flash('success', 'Account created successfully!');
             res.redirect("/notes");
        });
    } catch (e) {
        console.log("SIGNUP ERROR:");
        console.log(e);
        console.log(e.stack);
        req.flash('error', e.message);
        res.redirect('/signup');
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login.ejs');
};

module.exports.renderLoginSuccessForm = (req,res)=>{
    res.render("users/login-success");
}

module.exports.login = async (req, res) => {
    req.flash('success', 'Welcome back!');
    // let redirectURL = res.locals.redirectURL || "/notes";
    // res.redirect(redirectURL);
    res.redirect("/login-success");
};

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
        req.flash('success', 'You have logged out successfully!');
        res.redirect('/login');
    });
};

module.exports.renderForgotPasswordForm = (req, res) => {
    res.render('users/forgot-password.ejs');
};

module.exports.forgotpassword = async (req, res) => {
        try{
            let { email } = req.body;
            let user = await User.findOne({ email });
            if(!user){
                req.flash('error','Email not found');
                return res.redirect('/forgot-password');
            }
            const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false,
                    specialChars: false
                }
            );
            user.otp = otp;
            user.otpExpiry = Date.now() + 300000;
            await user.save();
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Password Reset OTP',
                html: `
                    <h2>
                        Your OTP Code
                    </h2>

                    <h1>
                        ${otp}
                    </h1>

                    <p>
                        OTP valid for
                        5 minutes
                    </p>
                `
            });
            res.render('users/verify-otp', { email });
        }catch(err){
            console.log(err);
            req.flash("error", err.message);
            res.redirect("/forgot-password");
        }
};

module.exports.verifyotp = async (req, res) => {
    try{
        let { email, otp } = req.body;
        let user = await User.findOne({ email });
        if(!user){
            req.flash('error', 'User not found');
            return res.redirect('/forgot-password');
        }
        if(user.otp !== otp){
            req.flash('error', 'Invalid OTP');
            return res.redirect('/forgot-password');
        }
        if(Date.now() > user.otpExpiry){
            req.flash('error', 'OTP has expired');
            return res.redirect('/forgot-password');
        }
       res.render('users/reset-password', { email });
    }catch(err){
        console.log(err);
        res.send(err.message);
    }
};

module.exports.resetpassword = async (req, res) => {
    try{
        let { email, password, confirmPassword } = req.body;
        let user = await User.findOne({ email });
        if(!user){
            req.flash('error', 'User not found');
            return res.redirect('/forgot-password');
        }
        if(password !== confirmPassword){
            req.flash('error', 'Passwords do not match');
            return res.redirect('/forgot-password');
        }
        await user.setPassword(password);
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        req.flash('success', 'Password reset successfully!');
        res.redirect('/login');
    }catch(err){
        console.log(err);
        res.send(err.message);
    }
};