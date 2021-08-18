const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    title: { type: String, required: true },
    release_date: { type: Date, required: true },
    original_title: {type: String, required: true },
    backdrop_path: { type: String, required: true },
    poster_path: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    //* Embedded documents
    reviews: [ { rating: Number, sessionId: String }],
  },
  { timestamps: true }
);
movieSchema.index({ title: 'text', original_title: 'text', description: 'text'});
const Movie = mongoose.model('Movie', movieSchema);
Movie.createIndexes();
module.exports = Movie;
