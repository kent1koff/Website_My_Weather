import React, { useState, useEffect } from 'react';
import Weather from './weather';
import search from '../../images/1.png';
import '../Main/main.scss';
import 'animate.css';

const Main = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('today');

  const searchWeather = (event) => {
    event.preventDefault();
    const location = document.getElementById('location').value;
    Weather.getWeatherData(location, selectedDate, handleWeatherData);
  };

  const handleWeatherData = (data) => {
    setWeatherData(data);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const location = document.getElementById('location').value;
    Weather.getWeatherData(location, selectedDate, handleWeatherData);
  }, [selectedDate]);

  return (
    <div className='container search'>
      <div className='flex content-center'>
        <form onSubmit={searchWeather} className='animate__animated animate__zoomInUp animate__slow 3s'>
          <div>
            <input placeholder='Введіть місто...' id='location' required />
          </div>
          <button type='submit' className='searchBtn'>
            <img src={search} alt='Search' />
          </button>
        </form>
      </div>
      <Weather.DateSelector selectedDate={selectedDate} onDateChange={handleDateChange} />
      {weatherData && (
        <>
          <Time />
          <Weather.LargeCard data={weatherData.largeWeatherData} />
          <Weather.SmallCards data={weatherData.smallWeatherData} />
        </>
      )}
    </div>
  );
};

const Time = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    function getCurrentTime() {
      const currentDate = new Date();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
      return formattedTime;
    }

    setCurrentTime(getCurrentTime());

    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return <div className='current_time'>{currentTime}</div>;
};

export default Main;