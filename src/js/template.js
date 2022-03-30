export default (() => {
  function renderWeatherTemplate(weatherObj) {
    const currentTemplate = `
      <div class="current">
        <div class="date">
          ${weatherObj.getCurrent().getDate().weekday},
          ${weatherObj.getCurrent().getDate().day},
          ${weatherObj.getCurrent().getDate().month},
          ${weatherObj.getCurrent().getDate().year},
          ${weatherObj.getCurrent().getDate().time}
        </div>
        <div class="icon"><img src="${weatherObj.getCurrent().getIcon()}"/></div>
        <div class="description">${weatherObj.getCurrent().getDescription()}</div>
        <div class="temperature">${weatherObj.getCurrent().getTemperature()}</div>
      </div>
      `;
    const start = '<div class="forcast">';
    const end = '</div>';
    const forcastTemplate = weatherObj.getForcast().reduce((str, weatherUnit) => `
      ${str}
      <div class="forcast">
        <div class="date">
          ${weatherUnit.getDate().weekday},
          ${weatherUnit.getDate().day},
          ${weatherUnit.getDate().month},
          ${weatherUnit.getDate().year},
          ${weatherUnit.getDate().time}
        </div>
        <div class="icon"><img src="${weatherUnit.getIcon()}"/></div>
        <div class="description">${weatherUnit.getDescription()}</div>
        <div class="temperature">${weatherUnit.getTemperature()}</div>
      </div>
      `, '');
    return currentTemplate + start + forcastTemplate + end;
  }

  return { renderWeatherTemplate };
})();
