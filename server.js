'use strict';

require('dotenv').config();
const express = require('express');
const app = express();

const cors = require('cors');

const mongoose = require('mongoose');

const clear = require('./modules/clear.js');
const seed = require('./modules/seed.js');
const test = require('./modules/test.js');

const getOneBook = require('./modules/getOneBook.js');
const getAllBooks = require('./modules/books.js');
const saveBook = require('./modules/saveBook.js');
const deleteBook = require('./modules/deleteBook.js');
const updateBook = require('./modules/updateBook.js');

const errorHandler = require('./modules/404.js');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/clear', clear);
app.get('/seed', seed);
app.get('/test', test);

app.get('/books/:id', getOneBook);
app.get('/books', getAllBooks);
app.post('/books', saveBook);
app.delete('/books/:id', deleteBook);
app.put('/books/:id', updateBook);

app.get('*', errorHandler);

// mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error to the db: '));
// db.once('open', () => console.log('HURRAY - mongodb is now connected'));

// app.listen(PORT, () =>
//   console.log(`listening on port http://localhost:${PORT}`)
// );
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to the database');
    //listen to port
    app.listen(PORT, () => {
      console.log(`listening on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.log(
      `There was an error with trying to connect to db and then server: ${error}`
    );
  });
