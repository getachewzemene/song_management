const express = require('express');
const {
  createSong,
  listSongs,
  updateSong,
  deleteSong,
} = require('../controllers/songController');

const router = express.Router();

router.route('/').post(createSong).get(listSongs);
router.route('/:id').put(updateSong).delete(deleteSong);

module.exports = router;