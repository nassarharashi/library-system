const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  copies: {
    type: Number,
    default: 1,
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
