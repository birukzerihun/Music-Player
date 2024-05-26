const mongoose = require('mongoose');

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

module.exports = Music;
