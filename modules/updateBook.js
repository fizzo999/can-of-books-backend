'use strict';

const jwt = require('jsonwebtoken');
const getKey = require('./getKey.js');
const BookModel = require('../models/books.js');

async function updateBook(req, res) {
  try {
    let id = req.params.id;
    console.log('================== id', id);
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      await jwt.verify(token, getKey, {}, async function (err, user) {
        if (err) {
          res.status(500).send('invalid token');
        } else if (!id) {
          res
            .status(500)
            .send(
              'we did not receive the ID of the book you are trying to delete'
            );
        } else {
          let {
            title,
            author,
            description,
            publishDate,
            myOwnRating,
            email,
            image,
          } = req.body;
          let updatedBook = {
            title,
            author,
            description,
            publishDate,
            myOwnRating,
            email,
            image,
          };
          console.log('\n here is the updated Book data ????', updatedBook);
          await BookModel.findByIdAndUpdate(
            id,
            updatedBook,
            (err, dataBaseResults) => {
              if (err) {
                console.log('error trying to update a book', err);
                res.status(500).send(`can't access db ${err}`);
              } else {
                console.log('success, updated DB', dataBaseResults);
                res.status(200).json(dataBaseResults);
              }
            }
          );
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
        `Something went wrong with trying to read that token..... on the test route ${err}`
      );
  }
}

module.exports = updateBook;
