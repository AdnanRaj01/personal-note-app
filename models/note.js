
const mongoose = require("mongoose");
const Review = require("./review.js");

const noteSchema = new mongoose.Schema({

  image: {
    type: String
  },

  title: {
    type: String,
    required: true
  },

  category: {
    type: String,
    default: "Personal"
  },

  description: {
    type: String,
    required: true
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },

  tags: [
    {
      type: String
    }
  ],

  status: {
    type: String,
    enum: [
      "Pending",
      "In Progress",
      "Completed"
    ],
    default: "Pending"
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

   reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
},  
   {
       timestamps: true
  }
);

noteSchema.post("findOneAndDelete", async (note) => {
  if (note) {
    await Review.deleteMany({
      _id: { $in: note.reviews }
    });
  }
});

module.exports = mongoose.model("Note", noteSchema);