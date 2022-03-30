export default (() => {
  const API_KEY = '8f8f2065d814ab45455d6698b7a38459';

  const WeatherUnit = (date, description, temperature) => {
    const proto = {
      date, description, temperature,
    };

    function getDate() {
      return proto.date;
    }

    function getDescription() {
      return proto.description;
    }

    function getTemperature() {
      return proto.temperature;
    }

    return { getDate, getDescription, getTemperature };
  };

  const Weather = (dataObj) => {
    const current = WeatherUnit(
      dataObj.current.dt,
      dataObj.current.weather[0].description,
      dataObj.current.temp,
    );
    const forcast = dataObj.daily.map((day) => WeatherUnit(
      day.dt,
      day.weather[0].description,
      day.temp.day,
    ));

    function getCurrent() {
      return current;
    }

    function getForcast() {
      return forcast;
    }

    return { getCurrent, getForcast };
  };

  /* City factory function */
  const City = (argLat, argLon) => {
    const lat = argLat;
    const lon = argLon;
    // const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${API_KEY}`;

    /* eslint-disable no-console */
    /* given a city object, return the weather data object */
    async function getFromUrl(resourceUrl) {
      let resourceObj;
      try {
        const response = await fetch(resourceUrl, { mode: 'cors' });
        // A fetch() promise does not reject on HTTP errors (404, etc.)
        if (response.ok) { // http status = 200
          resourceObj = await response.json();
        } else {
          console.log(`Http Error: status = ${response.status}`);
        }
      } catch (err) {
        console.log(err);
      }
      return resourceObj;
    }

    async function getWeatherData() {
      const weatherData = await getFromUrl(oneCallUrl);
      return weatherData;
    }

    return { getWeatherData };
  };

  const Cities = (() => {
    const bank = {
      shanghai: City(31.224361, 121.469170),
      montreal: City(45.508888, -73.561668),
    };

    function get(name) {
      return bank[name];
    }

    return { get };
  })();

  return { Weather, Cities };
})();
