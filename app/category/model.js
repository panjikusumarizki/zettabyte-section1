const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Name of category must be filled']
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);