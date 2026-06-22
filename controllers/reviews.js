const Note = require("../models/note");
const Review = require('../models/review.js');
const ExpressError = require("../utils/ExpressError");

module.exports.createReview = async(req, res) => {
  let note = await Note.findById(req.params.id);
if(!note){
    throw new ExpressError(404, "Note Not Found");
}
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  note.reviews.push(newReview);

  await newReview.save();
  await note.save();
   req.flash("success", "New Review Created!");

  res.redirect(`/notes/${note._id}`);
};

module.exports.destroyReview = async(req,res) => {

    let { id, reviewId } = req.params;

    await Note.findByIdAndUpdate(
        id,
        { $pull: { reviews: reviewId } }
    );

    await Review.findByIdAndDelete(reviewId);
     req.flash("success", " Review deleted!");

    res.redirect(`/notes/${id}`);
};