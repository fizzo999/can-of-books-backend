'use strict';

const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
  EquipModel.find((err, item) => {
    if (err) return res.status(500).send(err);
    else {
      res.status(200).send(item);
    }
  });
});
app.get('/seed', seed);
app.get('/clear', clearTheDB);
app.get('/find', findEntry);
app.get('*', (req, res) => {
  res.status(404).send('That route does not exist - check your spelling');
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error to the db: '));
db.once('open', () => console.log('HURRAY - mongodb is now connected'));

app.listen(PORT, () =>
  console.log(`listening on port http://localhost:${PORT}`)
);

//Setup a schema which will shape the data that goes into the database
const equipSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  qty: { type: Number },
  status: {
    type: String,
    uppercase: true,
    enum: ['WORKING', 'REPAIR', 'REPLACEMENT'],
  },
});

//Model -> Apply the schema to the collection
const EquipModel = mongoose.model('bestbooks', equipSchema);

// //Sample data entry
// const sampleEntry = new EquipModel({
//   name: 'Proton Pack',
//   description: 'Unlicensed Nuclear Accelerator',
//   qty: 4,
//   status: 'WORKING',
// });
// sampleEntry.save();

//Find All the entries in the database
EquipModel.find((err, item) => {
  if (err) return console.error(err);
  console.log(item);
});

//clear the database
async function clearTheDB(req, res) {
  try {
    await EquipModel.deleteMany({});
    console.log('Database cleared');
    res.status(200).send('cleared');
  } catch (e) {
    console.log('error:', e.message);
  }
}

//Seed the database
function seed(req, res) {
  //Sample data entry
  const seedArr = [
    {
      name: 'Proton Pack',
      description: 'Unlicensed Nuclear Accelerator',
      qty: 4,
      status: 'REPLACEMENT',
    },
    {
      name: 'Ghost Trap',
      description: 'Temp Ghost Containment',
      qty: 4,
      status: 'WORKING',
    },
    {
      name: 'PKE Meter',
      description: 'Ghost Detection',
      qty: 2,
      status: 'REPAIR',
    },
  ];
  seedArr.forEach(seed => {
    let entry = new EquipModel(seed);
    entry.save();
  });
  res.status(200).send('Seeded Database');
}

//filter to return only a matching criteria
async function findEntry(req, res) {
  if (req.query.status) {
    let { status } = req.query;
    let filterQ = {};
    filterQ.status = status;
    // let filterQ = { status: req.query.status } ???? isn`t that the same ? - just in 1 line of code ????
    const item = await EquipModel.find(filterQ);
    res.status(200).send(item);
  } else {
    res.status(200).send([]);
  }
}
