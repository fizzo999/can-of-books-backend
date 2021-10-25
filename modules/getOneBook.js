'use strict';

const jwt = require('jsonwebtoken');
const getKey = require('./getKey.js');
const BookModel = require('../models/books.js');

async function getOneBook(req, res) {
  try {
    let id = req.params.id;
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      console.log(
        'getOneBook route hit and here is token =======>>>>>>>>',
        token
      );

      await jwt.verify(token, getKey, {}, async function (err, user) {
        if (err) {
          res.status(500).send('invalid token');
        } else if (!id) {
          res
            .status(500)
            .send(
              'we did not receive the ID of the book you are trying to access'
            );
        } else {
          // here goes the code to delete the book
          let retrievedBook = await BookModel.find({ id });
          res.status(200).send(retrievedBook);
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

module.exports = getOneBook;
