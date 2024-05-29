const Music = require('../models/musicModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllMusics = async (req, res) => {
  try {
    const features = new APIFeatures(Music.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const musics = await features.query;
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

exports.genreStats = async (req, res) => {
  try {
    const genreStats = await Music.aggregate([
      {
        $group: { _id: '$genre', numSongs: { $sum: 1 } },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        genreStats,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

exports.artistStats = async (req, res) => {
  try {
    const artistStats = await Music.aggregate([
      {
        $group: {
          _id: '$artist',
          numSongs: { $sum: 1 },
        },
      },

      // { $count: 'Total' },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        artistStats,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};
