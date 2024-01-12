import { useEffect, useState } from "react";
import { clear, cloud, drizzle, humidity, rain, snow, wind } from "../assets";
import { useParams } from "react-router-dom";
import { API } from "./config";
import axios from "axios";

const enum Temperature {
  celcius = "metric",
  farenheit = "imperial",
  kelvin = "",
}
const WeatherApp = () => {
  const [wicon, setWicon] = useState(cloud);
  const { city } = useParams();

  useEffect(() => {
    const callingAPI = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${API}`;
      let response = await fetch(url);
      let data = await response.json();

      const humidity = document.getElementsByClassName("humidity-percent")[0] as HTMLSpanElement;
      const wind = document.getElementsByClassName("wind-rate")[0] as HTMLSpanElement;
      const temperature = document.getElementsByClassName("weather-temp")[0] as HTMLSpanElement;
      const location = document.getElementsByClassName("weather-location")[0] as HTMLSpanElement;

      humidity.innerHTML = Math.floor(data.main.humidity) + "%";
      wind.innerHTML = Math.floor(data.wind.speed) + " km/h";
      temperature.innerHTML = Math.floor(data.main.temp) + "&#176;C";
      location.innerHTML = data.name;

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear);
      } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
        setWicon(cloud);
      } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
        setWicon(drizzle);
      } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
        setWicon(cloud);
      } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
        setWicon(rain);
      } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
        setWicon(rain);
      } else if (data.weather[0].icon === "11d" || data.weather[0].icon === "11n") {
        setWicon(snow);
      } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
        setWicon(snow);
      } else if (data.weather[0].icon === "50d" || data.weather[0].icon === "50n") {
        setWicon(cloud);
      }
    };
    callingAPI();
  }, []);

  const convertTemperature = async (city = "London", temperature: Temperature = Temperature.celcius) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${temperature}&appid=${API}`;

    let symbol = "C";

    if (temperature === Temperature.farenheit) {
      symbol = "F";
    }
    if (temperature === Temperature.kelvin) {
      symbol = "K";
    }

    try {
      const response = await axios.get(url);
      const temperature = Math.floor(response.data.main.temp);

      const temperatureElement = document.getElementsByClassName("weather-temp")[0] as HTMLSpanElement;
      temperatureElement.innerText = `${temperature} °${symbol}`;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main>
      <div className="temperature-converter">
        <h1 className="title">Select Temperature</h1>
        <button className="active" onClick={() => convertTemperature(city)}>
          Celcius
        </button>
        <button className="active" onClick={() => convertTemperature(city, Temperature.farenheit)}>
          Farenheit
        </button>
        <button className="active" onClick={() => convertTemperature(city, Temperature.kelvin)}>
          Kelvin
        </button>
      </div>

      <div className="weather-image">
        <img src={wicon} alt="icon" />
      </div>

      <span className="weather-temp">24&#176;C</span>
      <span className="weather-location">London</span>
      <div className="data-container">
        <div className="element">
          <img src={humidity} alt="humidity" className="icon" />
          <div className="data">
            <span className="humidity-percent">64%</span>
            <span className="text">Humidity</span>
          </div>
        </div>
        <div className="element">
          <img src={wind} alt="wind" className="icon" />
          <div className="data">
            <span className="wind-rate">18 km/h</span>
            <span className="text">Wind Speed</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WeatherApp;
