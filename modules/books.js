'use strict';

const jwt = require('jsonwebtoken');
const BookModel = require('../models/books.js');
const getKey = require('./getKey.js');

async function getAllBooks(req, res) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      console.log('books route hit and here is token =======>>>>>>>>', token);

      await jwt.verify(token, getKey, {}, function (err, user) {
        if (err) {
          res.status(500).send(`invalid token ${err}`);
        } else {
          BookModel.find({}, (err, dataBaseResults) => {
            if (err) {
              res.status(500).send(`can't access db ${err}`);
            } else {
              res.status(200).json(dataBaseResults);
            }
          });
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
        `Something went wrong with trying to read that token..... on the books route ${err}`
      );
  }
}

module.exports = getAllBooks;
