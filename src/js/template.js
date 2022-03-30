export default (() => {
  function renderWeatherTemplate(cityName, weatherObj) {
    const currentTemplate = `<div class="current"><div class="date">${weatherObj.getCurrent().getDate()}</div><div class="description">${weatherObj.getCurrent().getDescription()}</div><div class="temperature">${weatherObj.getCurrent().getTemperature()}</div></div>`;
    const start = '<div class="forcast">';
    const end = '</div>';
    const forcastTemplate = weatherObj.getForcast().reduce((str, weatherUnit) => `${str}<div class="forcast"><div class="date">${weatherUnit.getDate()}</div><div class="description">${weatherUnit.getDescription()}</div><div class="temperature>${weatherUnit.getTemperature()}</div></div>`, '');
    return currentTemplate + start + forcastTemplate + end;
  }

  return { renderWeatherTemplate };
})();
