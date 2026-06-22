require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const nodemailer = require('nodemailer');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const multer = require('multer');
const ExpressError = require("./utils/ExpressError");


const noteRouter = require("./routes/note.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// Middleware setup
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);

// Session and Passport configuration
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
     maxAge: 7 * 24 * 60 * 60 * 1000,
     httpOnly: true,
    },  
};
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash message middleware and Current user middleware
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Multer
const storage = multer.diskStorage({
    destination:'uploads/',
    filename:(req,file,cb)=>{
        cb(
            null,
            Date.now() +
            path.extname(file.originalname)
        );
    }
});

const upload = multer({ storage });

// Connect to MongoDB
main()
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/personal_notes_app');
}

// Home Route
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Router
app.use("/notes", noteRouter);
app.use("/notes/:id/reviews", reviewRouter);
app.use("/", userRouter);


app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// Error Page Render Middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong!" } = err;
    res.status(statusCode).render("error", { err });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
