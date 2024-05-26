require("dotenv").config();

const axios = require("axios");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

app.get("/info", (request, response) => {
  response.send("<h1>Proxy to mask OpenWeather API key</h1>");
});

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

app.get("/api/proxy", (request, response) => {
  const { lat, lon } = request.query;

  if (!lat || !lon) {
    // 400 Bad Request
    return response
      .status(400)
      .json({ error: "Lat and Lon fields cannot be empty." });
  }

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    )
    .then((weatherData) => {
      response.json(weatherData.data);
    })
    .catch((error) => {
      response
        .status(500)
        .json({ error: "An error occurred while fetching weather data" });
    });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
