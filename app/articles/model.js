const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    require: [true, 'The title must be filled']
  },
  short_description: {
    type: String,
  },
  description: {
    type: String,
    require: [true, 'The description must be filled']
  },
  createdBy: {
    type: String,
    require: [true, 'The author must be provided']
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);