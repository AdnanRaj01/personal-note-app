const Joi = require('joi');

module.exports.noteSchema = Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    priority: Joi.string()
        .valid('Low','Medium','High')
        .required(),
    status: Joi.string()
        .valid('Pending','In Progress','Completed')
        .required()
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});