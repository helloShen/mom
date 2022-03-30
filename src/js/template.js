export default (() => {
  function renderWeatherTemplate(weatherObj) {
    const currentTemplate = `
      <div class="current">
        <div class="date">
          <div class="weekday">
            ${weatherObj.getCurrent().getDate().weekday}
          </div>
          <div class="dmy">
            ${weatherObj.getCurrent().getDate().day},
            ${weatherObj.getCurrent().getDate().month},
            ${weatherObj.getCurrent().getDate().year}
          </div>
        </div>
        <div class="hero">
          <div class="icon"><img src="${weatherObj.getCurrent().getIcon()}"/></div>
          <div class="description">${weatherObj.getCurrent().getDescription()}</div>
        </div>
        <div class="temperature">
          ${weatherObj.getCurrent().getTemperature()}
        </div>
        <div class="time">
          ${weatherObj.getCurrent().getDate().time}
        </div>
      </div>
      `;
    const start = '<div class="forcasts">';
    const end = '</div>';
    const forcastTemplate = weatherObj.getForcast().reduce((str, weatherUnit) => `
      ${str}
      <div class="forcast">
        <div class="date">
          <div class="weekday">
            ${weatherUnit.getDate().weekday.slice(0, 3).toUpperCase()}
          </div>
          <div class="dm">
            ${weatherUnit.getDate().day} ${weatherUnit.getDate().month}
          </div>
        </div>
        <div class="icon"><img src="${weatherUnit.getIcon()}"/></div>
        <div class="temperature">${weatherUnit.getTemperature()}</div>
      </div>
      `, '');
    return currentTemplate + start + forcastTemplate + end;
  }

  return { renderWeatherTemplate };
})();
