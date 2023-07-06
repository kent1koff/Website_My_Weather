import React from 'react';
import Weather from './weather';
import search from '../../images/1.png';
import '../Main/main.scss';

const Main = () => {
  const searchWeather = (event) => {
    event.preventDefault();
    const location = document.getElementById('location').value;
    Weather.getWeatherData(location);
  };

  return (
    <div className='container'>
      <div className='flex content-center'>
        <form onSubmit={searchWeather}>
          <div><input placeholder='Введіть місто...' id='location' required /></div>
          <button type='submit' className='searchBtn'><img src={search} alt='Search' /></button>
          <div id="weather"></div>
        </form>
      </div>
    </div>
  );
}

export default Main;