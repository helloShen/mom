export default (() => {
  const API_KEY = '8f8f2065d814ab45455d6698b7a38459';

  /* Format the date. */
  const MyDate = (() => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      // second: 'numeric',
    };

    /* Cut the date string into weekday, day, month and year. View module knows how to show them. */
    function formatDate(millisecond) {
      const date = new Date(millisecond);
      const dateStr = date.toLocaleDateString('en-US', options); // Saturday, September 17, 2016
      // eslint-disable-next-line prefer-const
      let [weekday, monthDay, year, time] = dateStr.split(', ');
      // eslint-disable-next-line prefer-const
      let [month, day] = monthDay.split(' ');
      month = month.slice(0, 3).toUpperCase();
      time = time.toLowerCase();
      return {
        weekday,
        day,
        month,
        year,
        time,
      };
    }

    return {
      formatDate,
    };
  })();

  const Temperature = (() => {
    function fahrenheitToCelsius(f) {
      return Math.floor(((f - 32) * 5) / 9);
    }

    function kelvinToCelsius(k) {
      return Math.floor(k - 273.15);
    }

    return { fahrenheitToCelsius, kelvinToCelsius };
  })();

  const WeatherUnit = (time, timezoneOffset, description, icon, temperature) => {
    const proto = {
      date: MyDate.formatDate((time + timezoneOffset) * 1000),
      description,
      icon: `http://openweathermap.org/img/wn/${icon}@2x.png`,
      temperature: `${Temperature.kelvinToCelsius(temperature)}℃`,
    };

    function getDate() {
      return proto.date;
    }

    function getDescription() {
      return proto.description;
    }

    function getIcon() {
      return proto.icon;
    }

    function getTemperature() {
      return proto.temperature;
    }

    return {
      getDate,
      getDescription,
      getIcon,
      getTemperature,
    };
  };

  const Weather = (dataObj) => {
    const current = WeatherUnit(
      dataObj.current.dt,
      dataObj.timezone_offset,
      dataObj.current.weather[0].main,
      dataObj.current.weather[0].icon,
      dataObj.current.temp,
    );
    const forcast = dataObj.daily.map((day) => WeatherUnit(
      day.dt,
      dataObj.timezone_offset,
      day.weather[0].main,
      day.weather[0].icon,
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
