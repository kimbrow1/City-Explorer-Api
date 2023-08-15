const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3001;
const cors = require('cors');
const errorHandle = require("./errorHandler");
const proofOfLife = require("./proofOfLife");
const weatherHandler = require("./weather");
const tmdbHandler = require("./tmdb");




app.use(cors());

app.get("/", proofOfLife);

app.get("/weather", weatherHandler)

app.get("/movies", tmdbHandler);

app.use(errorHandle);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
