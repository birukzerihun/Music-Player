const mongoose = require('mongoose');
const slugify = require('slugify');

const musicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A music should have a title'],
      trim: true,
    },
    slug: String,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
musicSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true }); //adding new property
  next();
});

// QUERY MIDDLEWARE
musicSchema.pre(/^find/, function (next) {
  this.start = Date.now();
  next();
});

musicSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;
