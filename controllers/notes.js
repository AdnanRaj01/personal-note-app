const Note = require("../models/note.js");
const ExpressError = require("../utils/ExpressError");


module.exports.index = async(req,res)=>{
        const { search } = req.query;
        let filter = {
            owner:req.user._id
        };
        if(search){
            filter.title = {
                $regex:search,
                $options:'i'
            };
        }
        const notes = await Note.find(filter)
        .sort({
            createdAt:-1
        });
        res.render('notes/dashboard', {
                notes,
                search: search || ''
            }
        );
};

module.exports.renderNewForm = (req,res)=>{
        res.render('notes/new.ejs');
};

module.exports.createNote = async(req,res,next)=>{
    if (!req.file) {
    throw new ExpressError(400, "Please upload an image");
}
      const note = new Note({
        title:req.body.title,
        category:req.body.category,
        description:req.body.description,
        priority:req.body.priority,
        status:req.body.status,
        owner:req.user._id
    });
    if(req.file){
        note.image = '/uploads/' + req.file.filename;
    }
    note.owner = req.user._id;
    await note.save();
    req.flash("success", "New Note Created!");
    res.redirect('/notes');
};

module.exports.myNote = async (req, res) => {
    const note = await Note.findOne({
        owner: req.user._id
    }).sort({ createdAt: -1 });
    if (!note) {
        req.flash('error', 'No Notes Found');
        return res.redirect('/notes');
    }
    res.redirect(`/notes/${note._id}`);
};

module.exports.showNote = async (req, res)=>{
   const note = await Note.findById(req.params.id)
   .populate({
    path: "reviews",
    populate: {
    path: "author",
   },
})
.populate("owner");
  if(!note) {
    req.flash("error", "Note you requested for does not exit!");
    res.redirect("/notes");
  }

 res.render('notes/show', { note });
};

module.exports.renderEditForm = async (req,res)=>{
        const note = await Note.findById(req.params.id);
        if(!note){
     throw new ExpressError(404, "Note Not Found");
}
  if(!note) {
    req.flash("error", "Note you requested for does not exit!");
    res.redirect("/notes");
  }
        res.render('notes/edit', { note });
};

module.exports.updateNote = async(req,res)=>{
    const updateData = {
        title:req.body.title,
        category:req.body.category,
        description:req.body.description,
        priority:req.body.priority,
        status:req.body.status
    };
    if(req.file){ updateData.image = '/uploads/' + req.file.filename; }
   await Note.findByIdAndUpdate(req.params.id, updateData, {
        runValidators: true,
        new: true
    }
);
    req.flash("success", "Note Updated!");
    res.redirect(`/notes/${req.params.id}`);
};

module.exports.destroyNote = async (req,res)=>{
        await Note.findOneAndDelete({
            _id:req.params.id,
            owner:req.user._id
        });
        req.flash('success', 'Note Deleted');
        res.redirect('/notes');
};