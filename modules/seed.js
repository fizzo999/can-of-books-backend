'use strict';

const BookModel = require('../models/books.js');
const addBook = require('./addBook.js');

async function seed(req, res) {
  try {
    let booksCurrentlyInDB = await BookModel.find({});
    if (booksCurrentlyInDB.length === 0) {
      await addBook({
        title: 'The Red Lion: The Elixir of Eternal Life',
        author: 'Maria Szepes',
        description:
          'Szepes tells the story of unhappy Hans Burger, a miller`s son born in the 16th century. After the death of his weak father and of a likewise miserable but beloved teacher, he becomes afraid of the unavoidable death of all living things. Driven by omnipresent rumours of an elixir of eternal life, he accompanies a mysterious alchemist. Instead of listening to his warnings, Burger, in his feverish greed, does not shrink away from murder; therefore he gets hold of the elixir spiritually unprepared. This is the starting point of a journey through the centuries, because from now on Burger can physically die, but is born into different circumstances over and over again and retains his full memory. Several times he tries to perform the great transmutation, which delivers him from his self-imposed curse. In front of the background of last five centuries` European history Hans Burger undergoes a dramatic personal development: at first an unconscious, even infamous, character, he grows on the problems confronting him. He reaches human perfection and finally becomes a Magus, an initiate. ',
        myOwnRating: 'FAVORITE FIVE',
        publishDate: '01-01-1946',
        email: 'fizzo999@gmail.com',
        image:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1176295393l/610681.jpg',
      });
      await addBook({
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        description:
          'Paulo Coelho`s enchanting novel has inspired a devoted following around the world. This story, dazzling in its powerful simplicity and soul-stirring wisdom, is about an Andalusian shepherd boy named Santiago, who travels from his homeland in Spain to the Egyptian desert in search of a treasure buried near the Pyramids.',
        myOwnRating: 'FAVORITE FIVE',
        publishDate: '01-01-1988',
        email: 'fizzo999@gmail.com',
        image:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1466865542l/18144590._SY475_.jpg',
      });
      await addBook({
        title: 'Ramtha: The White Book',
        author: 'J.Z. Knight',
        description:
          'The classic introduction to Ramtha and his teachings now revised and expanded with a Foreword by JZ Knight, a glossary of terms and concepts used by Ramtha, a detailed index and a commentary essay by Jaime Leal-Anaya showing the significance of Ramtha s teachings. It addresses questions on the Source of all existence, our forgotten divinity, life after death, evolution, love, the power of consciousness and the mind, lessons from nature, and Ramtha s ascension.',
        myOwnRating: 'FAVORITE FIVE',
        publishDate: '01-01-1988',
        email: 'fizzo999@gmail.com',
        image:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1387738271l/432226.jpg',
      });
      booksCurrentlyInDB = await BookModel.find({});
      res.status(200).send(`Seeded the DataBase ${booksCurrentlyInDB}`);
    } else {
      res
        .status(500)
        .send(
          'There seems to be something in the database already !!!! - could NOT seed DB'
        );
    }
  } catch (err) {
    res.status(500).send(`Error in seeding the database: ${err}`);
  }
}

module.exports = seed;
