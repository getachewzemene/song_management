const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  _id:ObjectId("5edf87a56d6cf21d33d8b9c2"),
  title: String,
  artist: String,
  album: String,
  genre: String,
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;