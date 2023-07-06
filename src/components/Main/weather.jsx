import $ from 'jquery';
import marker from '../../images/3.png';
import term from '../../images/2.png';

const Weather = {
  apiKey: 'ca0261b24741dfb6eadf3c1a736c7e32',
  getWeatherData: (location, day = 0) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${Weather.apiKey}`;
    $.get(apiUrl, (data) => {
      const forecastList = data.list;
      const forecast = forecastList[day * 8];
      const temperature = Math.round(forecast.main.temp - 273.15);
      const icon = forecast.weather[0].icon;
      const dateObj = new Date(forecast.dt_txt);
      const month = capitalizeFirstLetter(dateObj.toLocaleString('uk-UA', { month: 'long' }));
      const dayOfMonth = dateObj.getDate();
      const dayOfWeek = capitalizeFirstLetter(dateObj.toLocaleString('uk-UA', { weekday: 'long' }));
      const humidity = forecast.main.humidity;
      const visibility = forecast.visibility / 1000;
      const pressure = forecast.main.pressure;
      const windSpeed = forecast.wind.speed;
      const weatherCardHtml = `
        <div class="weather-card">
          <div class="location flex">${location}<img src="${marker}" alt='маркер' class="marker" /></div>
          <div class="flex items-center row_tmp_card content-center">
            <img src="${term}" alt='термометр' class="term" />
            <div class="temperature">${temperature}°C</div>
            <img src="https://openweathermap.org/img/w/${icon}.png" alt="Иконка погоды" class="weather_icon">
          </div>
          <div class="date_card">${month} ${dayOfMonth}, ${dayOfWeek}</div>
          <div class="additional-info flex content-center">
            <div class="flex direction-column items-center">
            <div class="more_info">Вологість</div>
            <div class="more_info">${humidity}%</div>
            </div>
            <div class="flex direction-column items-center">
            <div class="more_info">Видимість</div>
            <div class="more_info">${visibility} км</div>
            </div>
            <div class="flex direction-column items-center">
            <div class="more_info">Атмосферний тиск</div>
            <div class="more_info">${pressure} гПа</div>
            </div>
            <div class="flex direction-column items-center">
            <div class="more_info">Швидкість вітру</div>
            <div class="more_info">${windSpeed} м/с</div>
            </div>
          </div>
        </div>
      `;
      document.getElementById('weather').innerHTML = weatherCardHtml;
    });
  }
};
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default Weather;