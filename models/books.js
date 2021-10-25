'use strict';

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: false },
  description: { type: String, required: false },
  publishDate: { type: String },
  myOwnRating: {
    type: String,
    uppercase: true,
    enum: ['LIFE-CHANGING', 'FAVORITE FIVE', 'RECOMMENDED TO ME'],
  },
  email: { type: String, required: false },
  image: { type: String, required: false },
});

const BookModel = mongoose.model('bestbooks', bookSchema);
module.exports = BookModel;
