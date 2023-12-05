import marker from '../../images/3.png';
import term from '../../images/2.png';
import 'animate.css';

const Weather = {
  apiKey: process.env.REACT_APP_API_KEY,
  getWeatherData: (location, selectedDate, callback) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${Weather.apiKey}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const forecastList = data.list;
        const forecast = forecastList[0];
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
        const largeWeatherData = {
          location: location,
          temperature: temperature,
          icon: icon,
          month: month,
          dayOfMonth: dayOfMonth,
          dayOfWeek: dayOfWeek,
          humidity: humidity,
          visibility: visibility,
          pressure: pressure,
          windSpeed: windSpeed,
        };

        const smallWeatherData = forecastList
          .filter((forecast) => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            const today = new Date().getDate();
            const tomorrow = new Date().getDate() + 1;
            const afterTomorrow = new Date().getDate() + 2;

            if (selectedDate === 'today') {
              return forecastDate === today;
            } else if (selectedDate === 'tomorrow') {
              return forecastDate === tomorrow;
            } else if (selectedDate === 'afterTomorrow') {
              return forecastDate === afterTomorrow;
            }

            return false;
          })
          .map((forecast) => {
            const time = new Date(forecast.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const temperature = Math.round(forecast.main.temp - 273.15);
            const icon = forecast.weather[0].icon;
            return { time, temperature, icon };
          });

        const weatherData = { largeWeatherData, smallWeatherData };
        callback(weatherData);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  },

  LargeCard: ({ data }) => {
    const capitalizedLocation = capitalizeFirstLetter(data.location);
    const weatherIcon = getWeatherIcon(data.icon);

    return (
      <div className='flex content-center'>
        <div className='weather-card'>
          <div className='location flex'>
            {capitalizedLocation}
            <img src={marker} alt='маркер' className='marker' />
          </div>
          <div className='flex items-center row_tmp_card content-center'>
            <img src={term} alt='термометр' className='term' />
            <div className='temperature'>{data.temperature}°C</div>
            <img src={weatherIcon} alt='Иконкапогоды' className='weather_icon' />
          </div>
          <div className='date_card'>
            {data.month} {data.dayOfMonth}, {data.dayOfWeek}
          </div>
          <div className='additional-info flex content-center'>
            <div className='flex direction-column items-center'>
              <div className='more_info'>Вологість</div>
              <div className='more_info'>{data.humidity}%</div>
            </div>
            <div className='flex direction-column items-center'>
              <div className='more_info'>Видимість</div>
              <div className='more_info'>{data.visibility} км</div>
            </div>
            <div className='flex direction-column items-center'>
              <div className='more_info'>Атмосферний тиск</div>
              <div className='more_info'>{data.pressure} гПа</div>
            </div>
            <div className='flex direction-column items-center'>
              <div className='more_info'>Швидкість вітру</div>
              <div className='more_info'>{data.windSpeed} м/с</div>
            </div>
          </div>
        </div>
      </div>
    );
  },    

  SmallCards: ({ data }) => {
    return (
      <div className='small-weather-container flex content-center'>
        {data.map((forecast, index) => {
          const weatherIcon = getWeatherIcon(forecast.icon);

          return (
            <div key={index} className='small-weather-card'>
              <div className='time flex content-center'>{forecast.time}</div>
              <div className='icon'><img src={weatherIcon} alt='Weather Icon' /></div>
              <div className='temperature_small flex content-center'>{forecast.temperature}°</div>
            </div>
          );
        })}
      </div>
    );
  },

  DateSelector: ({ selectedDate, onDateChange }) => {
    const handleDateChange = (date) => {
      onDateChange(date);
    };

    return (
      <div className='date-selector flex animate__animated animate__zoomInRight animate__slow 3s'>
        <button className={`date-button ${selectedDate === 'today' ? 'active' : ''}`} onClick={() => handleDateChange('today')}>Сьогодні</button>
        <button className={`date-button ${selectedDate === 'tomorrow' ? 'active' : ''}`} onClick={() => handleDateChange('tomorrow')}>Завтра</button>
        <button className={`date-button ${selectedDate === 'afterTomorrow' ? 'active' : ''}`} onClick={() => handleDateChange('afterTomorrow')}>Післязавтра</button>
      </div>
    );
  },
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getWeatherIcon(icon) {
  switch (icon) {
    case '01d':
      return require('../../images/icon/sun.png');
    case '02d':
      return require('../../images/icon/sunobl.png');
    case '03d':
      return require('../../images/icon/obl.png');
    case '04d':
      return require('../../images/icon/obl.png');
    case '09d':
      return require('../../images/icon/vd.png');
    case '10d':
      return require('../../images/icon/mald.png');
    case '11d':
      return require('../../images/icon/gr.png');
    case '13d':
      return require('../../images/icon/snm.png');
    case '50d':
      return require('../../images/icon/tum.png');
    case '01n':
      return require('../../images/icon/clearnight.png');
    case '02n':
      return require('../../images/icon/twon.png');
    case '03n':
      return require('../../images/icon/obl.png');
    case '04n':
      return require('../../images/icon/obl.png');
    case '09n':
      return require('../../images/icon/vd.png');
    case '10n':
      return require('../../images/icon/mald.png');
    case '11n':
      return require('../../images/icon/gr.png');
    case '13n':
      return require('../../images/icon/snm.png');
    case '50n':
      return require('../../images/icon/tum.png');
    default:
      return require('../../images/icon/sunobl.png');
  }
}

export default Weather;