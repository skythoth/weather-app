import { useState, useEffect } from 'react'
import './App.css'

// api key = b70eade5a7e3677029b379a24924df97
const API_KEY = 'b70eade5a7e3677029b379a24924df97'
const cities = ['Seoul', 'Tokyo', 'New York', 'London']

function App() {
  const [weather, setWeather] = useState(null)
  const [currentCity, setCurrentCity] = useState('')

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    let response = await fetch(url)
    let data = await response.json()
    setWeather(data)
    setCurrentCity('current')
  }

  const getWeatherByCity = async (city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    let response = await fetch(url)
    let data = await response.json()
    setWeather(data)
    setCurrentCity(city)
  }

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat, lon)
    })
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  return (
    <div className="container">
      <h1>Weather App</h1>

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p className="description">{weather.weather[0].description}</p>
          <div className="temp-info">
            <p className="temp">{Math.round(weather.main.temp)}°C</p>
            <p className="temp-f">{Math.round(weather.main.temp * 9 / 5 + 32)}°F</p>
          </div>
        </div>
      )}

      <div className="btn-group">
        <button
          className={currentCity === 'current' ? 'active' : ''}
          onClick={getCurrentLocation}
        >
          Current Location
        </button>
        {cities.map((city) => (
          <button
            key={city}
            className={currentCity === city ? 'active' : ''}
            onClick={() => getWeatherByCity(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
