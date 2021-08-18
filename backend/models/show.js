const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const showSchema = new Schema(
  {
    name: { type: String, required: true },
    release_date: { type: Date, required: true },
    backdrop_path: { type: String, required: true },
    poster_path: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    //* Embedded documents
    reviews: [ { rating: Number, sessionId: String }],
  },
  { timestamps: true }
);
showSchema.index({ title: 'text', original_title: 'text', description: 'text'});
const Show = mongoose.model('Show', showSchema);
Show.createIndexes();
module.exports = Show;