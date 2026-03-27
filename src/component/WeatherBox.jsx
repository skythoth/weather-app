import React from 'react'

const WeatherBox = ({ weather }) => {
    return (
        <div className="weather-card">
            <h2>{weather?.name}</h2>
            <p className="description">{weather?.weather[0].description}</p>
            <div className="temp-info">
                <p className="temp">{Math.round(weather?.main.temp)}°C</p>
                <p className="temp-f">{Math.round(weather?.main.temp * 9 / 5 + 32)}°F</p>
            </div>
        </div>
    )
}
export default WeatherBox
