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

exports.getAllMusics = async (req, res) => {
  try {
    //BUILD QUERY
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    // console.log(req.query, queryObj);
    const query = Music.find(queryObj);
    // const query =  Music.find().where('genre').equals('rap');

    //EXCUTE QUERY
    const tours = await query;

    //SEND RESPONSE
    res.status(200).json({
      status: 'success',
      requestedAt: req.requastTime,
      results: musics.length,
      data: { musics },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

exports.getMusic = async (req, res) => {
  try {
    const music = await Music.findById(req.params.id);
    // Music.findOnd({_id: req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        music,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }

  // const music = musics.find((el) => el.id === id);

  // // if (id > musics.length) {
  // if (!music) {
  //   return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  // }
};

exports.createMusic = async (req, res) => {
  try {
    const newMusic = await Music.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { music: newMusic },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

exports.updateMusic = async (req, res) => {
  try {
    const music = await Music.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: 'success', data: { music } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

exports.deleteMusic = async (req, res) => {
  try {
    await Music.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: err });
  }
};
