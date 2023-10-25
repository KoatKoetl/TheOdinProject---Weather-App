import { Weather } from './renderValues.js';

const weatherApp = new Weather();
weatherApp.renderLeftCardBlock('Chisinau');
weatherApp.renderRightCardBlock('Chisinau');
weatherApp.handleClick();
weatherApp.logData();

// const forecastCards = Array.from(forecastCard);
// const forecastTimes = Array.from(forecastTime);
// const forecastTemperatures = Array.from(forecastTemperature);
