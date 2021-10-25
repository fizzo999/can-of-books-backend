'use strict';

function errorHandler(req, res) {
  res.status(404).send(`This route does NOT exist !!!`);
}

module.exports = errorHandler;
