const upload = require("../cloud/multer");
const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const User = require('../models/user');
const Note = require('../models/note');
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, isNoteOwner, validateNote } = require("../middleware");

const noteController = require("../controllers/notes");

// Dashboard index Route && // Create Route POST
router
.route("/")
.get(isLoggedIn, wrapAsync(noteController.index))
.post(isLoggedIn, upload.single('image'), validateNote, wrapAsync (noteController.createNote));

// Create Route GET
router.get('/new', isLoggedIn, noteController.renderNewForm);

// My Notes Route
router.get('/my-note', isLoggedIn, wrapAsync(noteController.myNote));

// EDIT NOTE PAGE 
router.get('/:id/edit',isLoggedIn, isNoteOwner, wrapAsync(noteController.renderEditForm));

// Read&Show Note Route  & // UPDATE NOTE Route & // DELETE NOTE Route
router.route('/:id')
.get( isLoggedIn, isNoteOwner, wrapAsync(noteController.showNote))
.put(isLoggedIn, isNoteOwner, upload.single('image'), validateNote, wrapAsync(noteController.updateNote))
.delete(isLoggedIn, isNoteOwner, wrapAsync(noteController.destroyNote));

module.exports = router;