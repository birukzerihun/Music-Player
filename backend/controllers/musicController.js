const Music = require('../models/musicModel');

// const fs = require("fs")

// const musics = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/musics-sample.json`)
// )

// exports.checkId = (req, res, next, val) => {
//   console.log(`the id is${val}`);
//   if (req.params.id * 1 > musics.length) {
//     return res.status(404).json({ status: 'fail', message: 'Invalid id' });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.title || !req.body.artist || !req.body.genre) {
//     return res
//       .status(400)
//       .json({ status: 'fail', message: 'Missing title, artist or genre' });
//   }
//   next();
// };

exports.getAllMusics = (req, res) => {
  console.log(req.requastTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requastTime,
    // results: musics.length,
    // data: { musics },
  });
};

exports.getMusic = (req, res) => {
  // const id = req.params.id * 1;

  // const music = musics.find((el) => el.id === id);

  // // if (id > musics.length) {
  // if (!music) {
  //   return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  // }

  res.status(200).json({
    status: 'success',
    // data: {
    //   music,
    // },
    // results: musics.length, data: { musics }
  });
};

exports.createMusic = async (req, res) => {
  try {
    const newMusic = await Music.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { music: newMusic },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: 'Invalid Data Sent' });
  }
};

exports.updateMusic = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', data: { music: '<Updated Music>' } });
};

exports.deleteMusic = (req, res) => {
  res.status(204).json({ status: 'success', data: null });
};
