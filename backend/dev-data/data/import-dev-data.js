const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Music = require('../../models/musicModel');

dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log('Database connected successfully 🚀'));

//READ JSON FILE
const musics = JSON.parse(
  fs.readFileSync(`${__dirname}/musics-sample.json`, 'utf-8'),
);

//IMPORT DATA TO DB
const importData = async () => {
  try {
    await Music.create(musics);
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETE DATA TO DB
const deleteData = async (req, res) => {
  try {
    await Music.deleteMany();
    console.log('Data successfully deleted');
  } catch (error) {
    console.log(err);
  }
  process.exit();
};

// console.log(process.argv);

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
