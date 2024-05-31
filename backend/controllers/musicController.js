const Music = require('../models/musicModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllMusics = catchAsync(async (req, res, next) => {
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
});

exports.getMusic = catchAsync(async (req, res, next) => {
  const music = await Music.findById(req.params.id);

  if (!music) {
    return next(new AppError('Can`t find music with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      music,
    },
  });
});

exports.createMusic = catchAsync(async (req, res, next) => {
  const newMusic = await Music.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { music: newMusic },
  });
});

exports.updateMusic = catchAsync(async (req, res, next) => {
  const music = await Music.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!music) {
    return next(new AppError('Can`t find music with that ID', 404));
  }

  res.status(200).json({ status: 'success', data: { music } });
});

exports.deleteMusic = catchAsync(async (req, res) => {
  const music = await Music.findByIdAndDelete(req.params.id);

  if (!music) {
    return next(new AppError('Can`t find music with that ID', 404));
  }
  res.status(204).json({ status: 'success', data: null });
});

exports.genreStats = catchAsync(async (req, res, next) => {
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
});

exports.artistStats = catchAsync(async (req, res, next) => {
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
});
