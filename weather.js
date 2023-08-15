const axios = require("axios");
const WEATHERBIT = process.env.WEATHERBIT;

class Forecast {
  constructor(description, date) {
    this.description = description;
    this.date = date;
  }
}

const weatherHandler = async (req, res, next) => {
  try {
    const { lat, lon } = req.query;
    const weatherData = await axios.get(
      `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHERBIT}&lat=${lat}&lon=${lon}&days=3`
    );
    const forecastArray = weatherData.data.data.map((item) => {
      return new Forecast(item.weather.description, item.valid_date);
    });
    res.send(forecastArray);
  } catch (error) {
    next(error);
  }
};

module.exports = weatherHandler;
