'use strict';

const jwt = require('jsonwebtoken');
const getKey = require('./getKey.js');
const BookModel = require('../models/books.js');

async function saveBook(req, res) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      await jwt.verify(token, getKey, {}, async function (err, user) {
        if (err) {
          res.status(500).send('invalid token');
        } else {
          console.log('req.body from saveBook/post: ', req.body);
          let {
            title,
            author,
            description,
            publishDate,
            myOwnRating,
            email,
            image,
          } = req.body;
          let newBookSaved = new BookModel({
            title,
            author,
            description,
            publishDate,
            myOwnRating,
            email,
            image,
          });
          let responseFromDB = await newBookSaved.save();
          res.status(200).send(responseFromDB);
        }
      });
    } else {
      res
        .status(500)
        .send(
          'Looks like you did not send a token in the authorization headers !!!!'
        );
    }
  } catch (err) {
    res
      .status(500)
      .send(
        `Something went wrong with trying to read that token..... on the post route ${err}`
      );
  }
}

module.exports = saveBook;
