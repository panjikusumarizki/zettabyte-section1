const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  },
  description: {
    type: String,
    require: [true, 'The description must be filled']
  },
  createdBy: {
    type: String,
    require: [true, 'The author must be provided']
  }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);