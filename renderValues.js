import { fetchWeatherData } from './getData.js';

class Weather {
  constructor() {
    // Search city elements from header
    this.searchCityBtn = document.querySelector('.search-button');
    this.cityNameInput = document.querySelector('.city-input');

    // Left card block elements
    this.cityName = document.querySelector('.city-name');
    this.dateElem = document.querySelector('.current-date');
    this.temperatureValue = document.querySelector('.temperature-value');
    this.weatherImg = document.querySelector('.weather-image');
    this.weatherDescription = document.querySelector('.weather-description');
    this.weatherFeels = document.querySelector('.weatherFeels-value');
    this.windSpeed = document.querySelector('.wind-speed');
    this.pressureValue = document.querySelector('.pressure-value');
    this.humidityValue = document.querySelector('.humidity-value');
    this.uvValue = document.querySelector('.uv-value');

    //Right card block elements
    this.forecastCard = Array.from(document.getElementsByClassName('forecast-card'));
    this.forecastTime = Array.from(document.getElementsByClassName('forecast-time'));
    this.forecastImg = Array.from(document.getElementsByClassName('forecast-image'));
    this.forecastTemperature = Array.from(document.getElementsByClassName('forecast-temperature'));
    this.gustValues = Array.from(document.getElementsByClassName('wind-gust-value'));
  }

  renderLeftCardBlock(city) {
    fetchWeatherData(city)
      .then((data) => {
        this.cityName.textContent = data.location.name;
        this.dateElem.textContent = 'Last update: ' + data.current.last_updated;
        if (data.current.temp_c > 0) {
          this.temperatureValue.textContent = '+' + Math.round(data.current.temp_c);
        }
        this.weatherImg.src = data.current.condition.icon;
        this.weatherDescription.textContent = data.current.condition.text;
        if (data.current.feelslike_c > 0) {
          this.weatherFeels.firstChild.textContent = '+' + Math.round(data.current.feelslike_c);
        }
        this.windSpeed.firstChild.textContent = data.current.wind_kph + ' km/h ' + `- direction: ${data.current.wind_dir}`;
        this.pressureValue.firstChild.textContent = data.current.pressure_mb + 'mb';
        this.humidityValue.firstChild.textContent = data.current.humidity + '%';
        this.uvValue.firstChild.textContent = data.current.uv;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderRightCardBlock(city) {
    fetchWeatherData(city)
      .then((data) => {
        const forecastHourArr = Array.from(data.forecast.forecastday[0].hour);
        const forecastSorterd = [];
        for (let i = 0; i < forecastHourArr.length; i += 7) {
          forecastSorterd.push(forecastHourArr[i]);
        }

        for (let i = 0; i < this.forecastCard.length; i++) {
          this.forecastTime[i].textContent = forecastSorterd[i].time.split(' ')[1];
          this.forecastImg[i].src = forecastSorterd[i].condition.icon;
          this.gustValues[i].textContent = forecastSorterd[i].gust_kph;
          if (forecastSorterd[i].temp_c > 0) {
            this.forecastTemperature[i].textContent = '+' + Math.round(forecastSorterd[i].temp_c);
          }
        }

        console.log(forecastSorterd);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleClick() {
    this.searchCityBtn.addEventListener('click', () => {
      this.renderLeftCardBlock(this.cityNameInput.value);
      this.renderRightCardBlock(this.cityNameInput.value);
    });
  }

  logData() {}
}

export { Weather };
