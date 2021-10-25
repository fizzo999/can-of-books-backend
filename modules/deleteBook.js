'use strict';

const jwt = require('jsonwebtoken');
const getKey = require('./getKey.js');
const BookModel = require('../models/books.js');

async function deleteBook(req, res) {
  try {
    let id = req.params.id;
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      console.log('delete route hit and here is token =======>>>>>>>>', token);

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
          // here goes the code to delete the book
          let deletedBook = await BookModel.findByIdAndDelete(id);
          res.status(200).send(deletedBook);
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
      .send(`Something went wrong with trying to delete a book ${err}`);
  }
}

module.exports = deleteBook;
