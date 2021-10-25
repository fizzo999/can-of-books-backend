'use strict';

const jwt = require('jsonwebtoken');
const getKey = require('./getKey.js');

async function test(req, res) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      console.log('test route hit and here is token =======>>>>>>>>', token);

      await jwt.verify(token, getKey, {}, function (err, user) {
        if (err) {
          res.status(500).send('invalid token');
        } else {
          res.status(200).send(user);
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

module.exports = test;
