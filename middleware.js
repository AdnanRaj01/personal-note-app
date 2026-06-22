const Note = require('./models/note');
const ExpressError = require("./utils/ExpressError");
const { noteSchema, reviewSchema } = require("./schema.js");
const Review = require('./models/review.js');


module.exports.isNoteOwner = async (req, res, next) => {
    const { id } = req.params;

    let note = await Note.findById(id);

    if(!note){
        req.flash("error","Note not found");
        return res.redirect("/notes");
    }

    if(
    !res.locals.currentUser ||
    !note.owner.equals(res.locals.currentUser._id)
){
    req.flash("error","You are not the owner of this note");
    return res.redirect(`/notes/${id}`);
}

    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const {id, reviewId } = req.params;
let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currentUser._id)) {
       req.flash("error", "You are not the author of this note");
       return res.redirect(`/notes/${id}`);
    }
     next();
};


module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectURL = req.originalUrl;
        req.flash("error", "you must be login to create note");
        return res.redirect("/login")
    }
    next();
};

module.exports.saveRedirectURL = (req, res, next) => {
    if(req.session.redirectURL) {
        res.locals.redirectURL = req.session.redirectURL;
    }
    next();
};

// validateNote Schema Funcation
module.exports.validateNote = (req, res, next) => {
  const { error } = noteSchema.validate(req.body);
if (error) {
    let errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);
}
next();
};

// validateReview Schema Funcation
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
if (error) {
    let errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);
}
next();
};