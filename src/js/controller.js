/* eslint-disable no-console */
import Model from './model';
import View from './view';

export default (() => {
  async function showWeather(cityName) {
    const cityObj = Model.Cities.get(cityName);
    const dataObj = await cityObj.getWeatherData();
    if (!dataObj) return;
    const weatherObj = Model.Weather(dataObj);
    View.showWeather(cityName, weatherObj);
  }

  return { showWeather };
})();
