'use strict';

const BookModel = require('../models/books.js');

async function clear(req, res) {
  try {
    await BookModel.deleteMany({});
    res.status(200).send('SUCCESS - DELETED THE WHOLE DATA BASE =====>>>>>>');
  } catch (err) {
    res.status(500).send(`Error in clearing database: ${err}`);
  }
}

module.exports = clear;
