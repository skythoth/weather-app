import { useState, useEffect } from 'react'
import './App.css'

// 앱이 실행되자마자 현재 위치 기반의 날씨가 보인다            
// 날시 정보에는 도시, 섭씨, 화씨, 날시 정보가 보인다          
// 5개의 버튼이 있다. (1개는 현재 날씨, 3개는 다른 도시)       
// 도시버튼 클릭할때마다 도시별 날씨가 업데이트 된다           
// 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다   
// 데이터를 들고오는 동안 로딩 스피너가 돈다                

// api key = d2472977222e45c1eab40e21d94933c9
const API_KEY = 'd2472977222e45c1eab40e21d94933c9'
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
