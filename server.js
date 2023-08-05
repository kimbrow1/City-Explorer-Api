const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const weatherData = require("./data/weather.json");

app.get("/", (req, res) => {
  res.send("Hello, Server!");
});

app.get("/weather", (req, res) => {
 const newDataData = weatherData.map((data) => {
    return{
        city_name: data.city_name,
        valid_date: data.valid_date,
        description: data.description,
    };
    response.send(weatherData);
 });


// app.get("./weather", (req, res) => {
//     const{lat,lon, searchQuery} = request.searchQuery;
// const cityForData = weatherData.find((data) => {
//     return {
//         data.city_name === city_name || 
//         data.valid_date === valid_date ||
//         Date.description == description
//     }
// })
// })




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

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

