export default (() => {
  function renderWeatherTemplate(cityName, weatherObj) {
    const dayOrNight = (weatherObj.getCurrent().isNight()) ? 'Night' : 'Day';
    const dayOrNightIcon = (weatherObj.getCurrent().isNight()) ? 'dark_mode' : 'light_mode';
    const title = `
      <div class="title">
        <div class="date">
          <div class="weekday">
            ${weatherObj.getCurrent().getDate().weekday}
          </div>
          <div class="dmy">
            ${weatherObj.getCurrent().getDate().day}&nbsp;
            ${weatherObj.getCurrent().getDate().month}&nbsp;
            ${weatherObj.getCurrent().getDate().year}
          </div>
        </div>
        <div class="name">
          <div class="text">${cityName}</div>
          <div class="dayNight">
            <div>${dayOrNight}</div>
            <div class="material-icons">${dayOrNightIcon}</div>
          </div>
        </div>
        <div class="time">
          ${weatherObj.getCurrent().getDate().time}
        </div>
      </div>
    `;

    const current = `
      <div class="current">
        <div class="hero">
          <div class="icon"><img src="${weatherObj.getCurrent().getIcon()}"/></div>
          <div class="description">${weatherObj.getCurrent().getDescription()}</div>
        </div>
        <div class="temperature">
          ${weatherObj.getCurrent().getTemperature()}
        </div>
      </div>
    `;

    const start = '<div class="forcasts">';
    const end = '</div>';
    const forcastMain = weatherObj.getForcast().reduce((str, weatherUnit) => `
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
    const forcast = start + forcastMain + end;
    return title + current + forcast;
  }

  function renderFooter(githubImg, year) {
    return `<div class="copyright">Copyright MIT © hireme.shen@gmail.com &nbsp;|&nbsp; Source code - <a href="https://github.com/helloShen/mom"><img class="github" src="${githubImg}"></a></div>
        <div class="year">2021-${year}</div>`;
  }

  return {
    renderWeatherTemplate,
    renderFooter,
  };
})();
