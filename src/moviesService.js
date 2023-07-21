// Import the axios library
const axios = require("axios");
const lodash = require("lodash");
const movieList = require("../data/movies.json").movies;

const getMovies = (done) => {
  // get all movies
  return done(null, JSON.stringify(movieList));
};

const getMoviesById = (movieId, done) => {
  // get movie by id
  let movie = null;
  const data = movieList.find((i) => i.id == movieId);
  if (!data) {
    return done("Requested movie doesn't exist..!", null);
  }
  movie = data;
  return done(null, JSON.stringify(movie));
};

const saveMovie = function (newMovie, done) {
  // save the details of a movie read from the request body
  const id = movieList.find((i) => i.id === newMovie.id);
  if (!id) {
    movieList.push(newMovie);
    return done(null, JSON.stringify(movieList));
  }
  return done("Movie already exists", null);
};

const updateMovie = function (movieId, updateData, done) {
  // update movie details of a specific movie
  let movieFound = false;
  lodash.forEach(movieList, (obj, index) => {
    if (obj.id === movieId) {
      movieList[index] = lodash.assign(obj, updateData);
      movieFound = true;
      return false;
    }
  });
  if (movieFound) {
    return done(null, JSON.stringify(movieList));
  } else {
    return done("Requested Movie doesn't exist!", null);
  }
};

const deleteMovieById = function (movieId, done) {
  // delete a specific movie
  const i = lodash.find(movieList, { id: movieId });
  if (!id) {
    return done("Requested Movie doesn't exist!", null);
  }
  lodash.remove(movieList, (obj) => obj.id === movieId);
  return done(null, JSON.stringify(movieList));
};

module.exports = {
  getMovies,
  getMoviesById,
  saveMovie,
  updateMovie,
  deleteMovieById,
};
