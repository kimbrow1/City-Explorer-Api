const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const weatherData = require("./data/weather.json");

app.get("/", (req, res) => {
  res.send("Hello, Server!");
});

app.get("/weather", (req, res) => {
  res.json(weatherData); 
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

