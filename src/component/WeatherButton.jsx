import React from 'react'

const cities = ['Seoul', 'Tokyo', 'New York', 'London']

const WeatherButton = ({ currentCity, getCurrentLocation, getWeatherByCity }) => {
    return (
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
    )
}

export default WeatherButton
