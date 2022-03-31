import Template from './template';
import GithubImg from '../assets/img/github_light.png';

export default (() => {
  function showWeather(cityName, weatherObj) {
    const cityElement = document.querySelector(`.city[data-city=${cityName}]`);
    if (!cityElement) return;
    const template = Template.renderWeatherTemplate(cityName.toUpperCase(), weatherObj);
    cityElement.insertAdjacentHTML('afterbegin', template);
    if (weatherObj.getCurrent().isNight()) {
      cityElement.classList.add('night');
    } else {
      cityElement.classList.add('day');
    }
  }

  function showFooter() {
    const year = new Date().getFullYear();
    document.querySelector('.footer').insertAdjacentHTML('afterbegin', Template.renderFooter(GithubImg, year));
  }

  return { showWeather, showFooter };
})();
