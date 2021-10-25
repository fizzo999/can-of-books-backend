'use strict';

const BookModel = require('../models/books.js');

async function addBook(obj) {
  try {
    let newBook = new BookModel(obj);
    console.log(`new book: ${obj} just got saved into the db`);
    return await newBook.save();
  } catch (e) {
    console.log(e);
  }
}

module.exports = addBook;
