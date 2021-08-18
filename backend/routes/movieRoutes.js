const express = require('express');

const movieController = require('../controllers/movieController');
const router = express.Router();

router.get('/movies/seed', movieController.seedMovies);
router.get('/movies', movieController.getMovies);
router.get('/shows', movieController.getShows);
router.post('/review', movieController.storeUserRating);
module.exports = router;
