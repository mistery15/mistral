const Show = require('../models/show');
const Movie = require('../models/movie');
const axios = require("axios");
const moment = require('moment');
const { createSearchQuery } = require('../helpers/filterHelpers');
//* GET /movies/seed
exports.seedMovies = async (req, res, next) => {
  try {
    for (let i = 1; i < 11; i++) {
      const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?page=${i}&api_key=be7d3278f48f2e94f919bdea0dd3adb5`);
      const movies = response.data.results;
      console.log(movies);
      movies.forEach(movie => {
        const newMovie = new Movie({
          title: movie.title,
          original_title: movie.original_title,
          release_date: movie.release_date,
          backdrop_path: movie.backdrop_path,
          poster_path: movie.poster_path,
          description: movie.overview,
          rating: movie.vote_average,
        });
        newMovie.save();
      });
    }
    for (let i = 1; i < 11; i++) {
      const response = await axios.get(`https://api.themoviedb.org/3/trending/tv/week?page=${i}&api_key=be7d3278f48f2e94f919bdea0dd3adb5`);
      const shows = response.data.results;
      
      shows.forEach(show => {
        const newShow = new Show({
          name: show.name,
          backdrop_path: show.backdrop_path,
          release_date: show.first_air_date,
          poster_path: show.poster_path,
          description: show.overview,
          rating: show.vote_average,
        });
        newShow.save();
      });
    }
    res.status(200).json({
      message: 'Seeded'
    });
  } catch (e) {
    next(e);
  }
};

exports.getMovies = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;
  const finalQuery = createSearchQuery(req.query.q);

  try {
    const filters = {
      ...finalQuery
    }
    const totalItems = await Movie.find(filters).countDocuments();
    const movies = await Movie.find(filters).skip((currentPage - 1) * perPage).limit(perPage).sort({ rating: -1 });
 
    res.status(200).json({
      message: 'Fetched movies successfully.',
      results: movies,
      totalItems: totalItems
    });
 
  } catch (error) {
    next(error);
  }
}

exports.getShows = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;
  const finalQuery = createSearchQuery(req.query.q);
  try {
    const filters = {
      ...finalQuery
    }
    const totalItems = await Show.find(filters).countDocuments();
    const shows = await Show.find(filters).skip((currentPage - 1) * perPage).limit(perPage).sort({ rating: -1 });
 
    res.status(200).json({
      message: 'Fetched shows successfully.',
      results: shows,
      totalItems: totalItems
    });
 
  } catch (error) {
    next(error);
  }
}

exports.storeUserRating = async (req, res, next) => {
  try {
    const { sessionId, rating, id, type } = req.body;
    //? Express validator would be better but overkill for this simple scenario
    if(!sessionId || !rating || !id || !type) {
      throw new Error('Invalid request, one of the required fields is missing.');
    }
    else if(type !== 'shows' && type !== 'movies'){
      throw new Error('Invalid request, type has to be either a show or a movie');
    }
    else if(!parseFloat(rating) || parseFloat(rating) > 10 || parseFloat(rating) < 0){
      throw new Error('Rating is not a number');
    }
    if(type === 'shows'){
      const show = await Show.findById(id);

      if(!show) 
        throw new Error('Show with the provided ID does not exist');

      show.reviews.forEach(review => {
        if(review.sessionId === sessionId) 
          throw new Error('You have already left a review on this show');
      });

      show.reviews = [...show.reviews, { rating, sessionId }];
      await show.save();

      res.status(200).json({
        message: 'Saved show review successfully.',
        result: show
      });
    } else {
      const movie = await Movie.findById(id);

      if(!movie) 
        throw new Error('Movie with the provided ID does not exist');

      movie.reviews.forEach(review => {
        if(review.sessionId === sessionId) 
          throw new Error('You have already left a review on this movie');
      });

      movie.reviews = [...movie.reviews, { rating, sessionId }];
      await movie.save();

      res.status(200).json({
        message: 'Saved movie review successfully.',
        result: movie
      });
    }
  } catch(e){
    next(e);
  }
}