import React, { useState } from "react";
import Axios from "axios";
import './App.css';
import CityComponent from "./modules/CityComponent";
import WeatherComponent from "./modules/WeatherComponent";


const AppId = "fe4feefa8543e06d4f3c66d92c61b69c";

function App() {
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();
  const [aqi, updateaqi] = useState();
  const fetchWeather = async (e) => {
    e.preventDefault();
    const response = await Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${AppId}`,
      
    );
    console.log(response.data.weather[0]);
    const lat = response.data.coord.lat;
    const lon = response.data.coord.lon;
    const rawData = await  Axios.get(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${AppId}`,
    );
    updateWeather(response.data);
    updateaqi(rawData.data.list[0]);
    console.log(rawData.data.list[0]);
    
  };
  return (

    <container id="Container">
      <span id="AppLabel">Weathernest<lord-icon
    src="https://cdn.lordicon.com/uvextprq.json"
    trigger="loop"
    delay="3000">
      </lord-icon></span>
      {city && weather ? (
        <WeatherComponent weather={weather} city={city} aqi={aqi} />
      ) : 
     
       (
        <CityComponent updateCity={updateCity} fetchWeather={fetchWeather} />
      )}
      <div id="copyright">©Hardiksehgal</div>
    </container>
    
  );
}

export default App;