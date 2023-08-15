// const express = require("express");
// const app = express();
// require("dotenv").config();
// const port = process.env.PORT || 3001;
// const cors = require('cors');
// const axios = require("axios");
// const errorHandle = require("./errorHandler");
// const WEATHERBIT = process.env.WEATHERBIT;
// const TMDB = process.env.TMDB;



// class Movie {
//   constructor (title, img, description){
//     this.title = title;
//     this.img = "https://image.tmdb.org/t/p/w500" + img;
//     this.description = description;
//   }
// }


// app.use(cors());

// const proofOfLife = (req, res) => {
//   res.send("Hello, Server!");
// };

// app.get("/", proofOfLife);

// app.get("/weather", async (req, res, next) => {
//   try {
//     const { lat, lon } = req.query;
//     const weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHERBIT}&lat=${lat}&lon=${lon}&days=3`);
//     const forecastArray = weatherData.data.data.map((item) => {
//       return new Forecast(item.weather.description, item.valid_date);
//     });
//     res.send(forecastArray);
//   } catch (error) {
//     next(error);
//   }
// });

// const tmdbHandler = async (req, res, next) => {





const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3001;
const cors = require('cors');
const axios = require("axios");
const errorHandle = require("./errorHandler");
const WEATHERBIT = process.env.WEATHERBIT;
const TMDB = process.env.TMDB;



class Forecast {
  constructor(description, date) {
    this.description = description;
    this.date = date;
  }
}
class Movie {
  constructor(overview, title, img) {
    this.overview = overview;
    this.title = title;
    this.img = "https://image.tmdb.org/t/p/w500" + img;
  }
}

app.use(cors());

const proofOfLife = (req, res) => {
  res.send("Hello, Server!");
};

app.get("/", proofOfLife);

app.get("/weather", async (req, res, next) => {
  try {
    const { lat, lon } = req.query;
    const weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHERBIT}&lat=${lat}&lon=${lon}&days=3`);
    const forecastArray = weatherData.data.data.map((item) => {
      return new Forecast(item.weather.description, item.valid_date);
    });
    res.send(forecastArray);
  } catch (error) {
    next(error);
  }
});

const tmdbHandler = async (req, res, next) => {
  try {
    const { cityName } = req.query;
    const movieData = await axios({
      method: "get",
      url: `https://api.themoviedb.org/3/search/movie?query=${cityName}&include_adult=false&language=en-US&page=1`,
      headers: {
        "Authorization": `Bearer ${TMDB}`
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

app.get("/movies", tmdbHandler);

app.use(errorHandle);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
