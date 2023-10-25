async function fetchWeatherData(city) {
  // Try ... catch for handling errors
  try {
    const weatherData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=bb9f6af4f5a74fb38a5120141232909&q=${city}&aqi=no`, {
      mode: 'cors',
    });
    const weather = await weatherData.json();
    console.log(weather);
    return weather;
  } catch (error) {
    console.log(error);
  }
}

export { fetchWeatherData };
