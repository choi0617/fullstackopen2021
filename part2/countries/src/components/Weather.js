import React, { useEffect, useState } from "react";
import axios from "axios";

require("dotenv").config();

const Weather = ({ capital }) => {
  const REACT_APP_WEATHERSTACK_API_KEY =
    process.env.REACT_APP_WEATHERSTACK_API_KEY;
  const WEATHERSTACK_URL = `http://api.weatherstack.com/current?access_key=${REACT_APP_WEATHERSTACK_API_KEY}&query=${capital}`;

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(WEATHERSTACK_URL);
      setWeatherData(result.data);
    };

    fetchData();
  }, [WEATHERSTACK_URL]);

  console.log(weatherData);

  return (
    <div>
      <h3>
        <b>Weather in {capital}</b>
      </h3>
      {weatherData && (
        <div>
          <p>
            <b>temperature:</b> {weatherData.current.temperature} Celcius{" "}
          </p>
          <p>
            <img
              alt="weather icon"
              src={weatherData.current.weather_icons[0]}
            />
          </p>
          <p>
            <b>wind:</b> {weatherData.current.wind_speed} mph direction{" "}
            {weatherData.current.wind_dir}{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
