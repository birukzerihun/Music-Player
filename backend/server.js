const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const mongoose = require('mongoose');
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log('Database connected successfully 🚀'));

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A music should have a title'],
  },
  artist: {
    type: String,
    required: [true, 'A music should have a artist'],
  },
  album: {
    type: String,
  },
  genre: {
    type: String,
    required: [true, 'A music should have a genre'],
  },
});

const Music = mongoose.model('Music', musicSchema);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('app listening on port ' + port);
});
