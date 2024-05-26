const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A music should have a title'],
    trim: true,
  },
  artist: {
    type: String,
    required: [true, 'A music should have a artist'],
    trim: true,
  },
  album: {
    type: String,
    trim: true,
  },
  genre: {
    type: String,
    required: [true, 'A music should have a genre'],
  },
  // imageCover: {
  //   type: String,
  // },
  createdAt: {
    type: Date,
    default: Date.now(),
    // select: false
  },
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;
