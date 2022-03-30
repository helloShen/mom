import Template from './template';

export default (() => {
  function showWeather(cityName, weatherObj) {
    const cityElement = document.querySelector(`.city[data-city=${cityName}]`);
    if (!cityElement) return;
    const template = Template.renderWeatherTemplate(cityName, weatherObj);
    cityElement.insertAdjacentHTML('beforeend', template);
  }

  return { showWeather };
})();
