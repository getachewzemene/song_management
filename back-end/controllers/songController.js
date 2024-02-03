const Song = require('../models/songModel');

// Controller functions
exports.createSong = async (req, res, next) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (err) {
    next(err);
  }
};

exports.listSongs = async (req, res, next) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    next(err);
  }
};

exports.updateSong = async (req, res, next) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedSong);
  } catch (err) {
    next(err);
  }
};

exports.deleteSong = async (req, res, next) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};