const express = require("express");
const app = express();
require("dotenv").config(); // will need anytime i use process.env express file 
const port = process.env.PORT || 3001;
const cors = require ('cors');
const axios = require("axios");
const WEATHERBIT = process.env.WEATHERBIT;



class Forecast {
  constructor (description, date) {
    this.description = description;
    this.date = date;
  }
}

// It opens security on routes snd allows you to use middle ware
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, Server!");
});


app.get("/weather", async (req, res) => {
// const cityForData = weatherData.find((data) => {
//     return {
//         data.city_name === city_name || 
//         data.valid_date === valid_date ||
//         Date.description == description
//     }
// }) 
  try { 
    const{lat,lon, cityName} = req.query;
    const weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHERBIT}&lat=${lat}&lon=${lon}&days=3`
    );
    weatherData.data.data;
    const forecastArray = weatherData.data.data.map((item) => {
      return new Forecast(item.weather.description, item.valid_date);
    });
    res.send(forecastArray);
  } catch (error) {
    res.status(500).send (error.message);
  }
});




//   if (lat && lon) {
//     const cityForData = weatherData.find((p) => p.lat === lat && p.lon === lon);
//     if (cityForData) {
//       return res.json(cityForData);
//     } else {
//       return res.status(404).json({ error: "City data not found." });
//     }
//   } else {
//     return res.status(400).json({ error: "lat and lon parameters are required." });
//   }
// });



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

