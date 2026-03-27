import { useState, useEffect } from 'react'
import './App.css'
import WeatherBox from './component/WeatherBox'
import WeatherButton from './component/WeatherButton'

// 앱이 실행되자마자 현재 위치 기반의 날씨가 보인다
// 날시 정보에는 도시, 섭씨, 화씨, 날시 정보가 보인다
// 5개의 버튼이 있다. (1개는 현재 날씨, 3개는 다른 도시)
// 도시버튼 클릭할때마다 도시별 날씨가 업데이트 된다
// 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다
// 데이터를 들고오는 동안 로딩 스피너가 돈다

// api key = d2472977222e45c1eab40e21d94933c9
const API_KEY = 'd2472977222e45c1eab40e21d94933c9'

function App() {
  const [weather, setWeather] = useState(null)
  const [currentCity, setCurrentCity] = useState('')

  //위치에 따른 날씨정보 받아오기
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    let response = await fetch(url)
    let data = await response.json()
    setWeather(data)
    setCurrentCity('current')
  }

  //도시별 날짜정보 받아오기
  const getWeatherByCity = async (city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    let response = await fetch(url)
    let data = await response.json()
    setWeather(data)
    setCurrentCity(city)
  }

  //현재 위치 정보 받아오기
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat, lon)
    })
  }

  //앱이 실행되자마자 현재 위치 기반의 날씨가 보인다
  useEffect(() => {
    getCurrentLocation()
  }, [])

  return (
    <div className="container">
      <h1>Weather App</h1>

      <WeatherBox weather={weather} />
      <WeatherButton
        currentCity={currentCity}
        getCurrentLocation={getCurrentLocation}
        getWeatherByCity={getWeatherByCity}
      />
    </div>
  )
}

export default App
