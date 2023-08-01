const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const weatherData = require("./data/weather.json"); // Use require to read the weather.json file

app.get("/", (req, res) => {
  res.send("Hello, Server!");
});

app.get("/weather", (req, res) => {
  res.json(weatherData); // Return the weather data as JSON
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

