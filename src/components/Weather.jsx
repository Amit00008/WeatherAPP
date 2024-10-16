import React, { useEffect, useRef, useState } from 'react'
import '../components/weather.css'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import search_icon from '../assets/search.png'
import wind_icon from '../assets/wind.png'
import snow_icon from '../assets/snow.png'
function Weather() {

   
    const inputRef = useRef('');
    const [weatherData, setWeatherData] = useState(false);
    const ALlicons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }
    

    const searchData = async (city) => {
        try {

            if (!city) {
                return alert('City name is required');
            }

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API}`;
            const res = await fetch(url);
            const data = await res.json();
            const icon = ALlicons[data.weather[0].icon] || clear_icon;
            console.log(data);

            setWeatherData({
                temp: Math.floor(data.main.temp),
                humidity: data.main.humidity,
                wind: data.wind.speed,
                city: data.name,
                icons: icon
            });

        } catch (error) {
            setWeatherData(false);
            alert('City not found');
        }
    }

    
  return (
    <main>
        
    <div className='weather-app'>
    
        
        <div className="container">
        <h1>Weather App</h1>
            <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search..." />
        
        <button onClick={()=>{searchData(inputRef.current.value)}}>
        Find
        </button>
     </div>

     {weatherData?<>

        <div className="weather-img">
        <img className='weatherimg' src={weatherData.icons} alt="" />
     </div>
     <div className="weather-info">
        <p>{weatherData.city}</p>
        <p>{weatherData.temp}°C</p>

        <div className="info">
           <div className="datal">
           <img src={humidity_icon} alt="" />
            <span>{weatherData.humidity}%</span>
        <p>Humidity</p>
           </div>
        <div className="datal">
        <img src={wind_icon} alt="" />
        <span>{weatherData.wind}km/h</span>
        <p>Wind</p>
        </div>
        </div>
     </div>
     
     
     </>:<h3 className='myh3'>Enter A city name to Check Weather</h3>}

     
        </div>
     

     
    </div>
    </main>
  )
}

export default Weather
