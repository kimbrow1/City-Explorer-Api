const TMDB = process.env.TMDB;
const axios = require("axios");

class Movie {
  constructor(overview, title, img) {
    this.overview = overview;
    this.title = title;
    this.img = "https://image.tmdb.org/t/p/w500" + img;
  }
}

const tmdbHandler = async (req, res, next) => {
  try {
    const { cityName } = req.query;
    const movieData = await axios({
      method: "get",
      url: `https://api.themoviedb.org/3/search/movie?query=${cityName}&include_adult=false&language=en-US&page=1`,
      headers: {
        Authorization: `Bearer ${TMDB}`,
      },
    });
    const movies = movieData.data.results.map((i) => {
      return new Movie(i.overview, i.title, i.poster_path);
    });

    res.send(movies);
  } catch (error) {
    next(error);
  }
};

module.exports = tmdbHandler;
