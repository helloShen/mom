export default (() => {
  const API_KEY = '8f8f2065d814ab45455d6698b7a38459';
  const API_KEY_2 = '932118092789c3c0ddaac0304dd3c886';

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

    /* night: 6:00 pm - 6:00 am
     * day: 7:00 am - 17:00 pm */
    function isNight(time) {
      const spliterIdx = time.indexOf(':');
      const hour = parseInt(time.slice(0, spliterIdx), 10);
      const ap = time.slice(-2, time.length);
      switch (ap) {
        case 'am':
          if (hour < 6) {
            return true;
          }
          return false;
        case 'pm':
          if (hour >= 6) {
            return true;
          }
          return false;
        default:
          return undefined;
      }
    }

    return {
      formatDate,
      isNight,
    };
  })();

  const Temperature = (() => {
    function fahrenheitToCelsius(f) {
      return Math.floor(((f - 32) * 5) / 9);
    }

    function kelvinToCelsius(k) {
      return Math.floor(k - 273.15);
    }

    return {
      fahrenheitToCelsius,
      kelvinToCelsius,
    };
  })();

  const WeatherUnit = (time, timezoneOffset, description, icon, temperature) => {
    const date = MyDate.formatDate((time + timezoneOffset) * 1000);
    const proto = {
      date,
      description,
      icon: `http://openweathermap.org/img/wn/${icon}@2x.png`,
      temperature: `${Temperature.kelvinToCelsius(temperature)}℃`,
      isNight: MyDate.isNight(date.time),
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

    function isNight() {
      return (proto.isNight);
    }

    return {
      getDate,
      getDescription,
      getIcon,
      getTemperature,
      isNight,
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

    return {
      getCurrent,
      getForcast,
    };
  };

  /* City factory function */
  const City = (argLat, argLon) => {
    const lat = argLat;
    const lon = argLon;
    // const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${API_KEY}`;
    const oneCallUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${API_KEY_2}`;

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
      let weatherData = await getFromUrl(oneCallUrl);
      if (!weatherData) {
        weatherData = await getFromUrl(oneCallUrl2);
      }
      return weatherData;
    }

    return {
      getWeatherData,
    };
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

  return {
    Weather,
    Cities,
  };
})();
