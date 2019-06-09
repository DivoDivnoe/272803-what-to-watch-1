const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * MINUTES_IN_HOUR;

const formatNumber = (number) => `${number < 10 ? 0 : ``}${number}`;

const parseTime = (seconds) => {
  const hours = Math.floor(seconds / SECONDS_IN_HOUR);
  seconds -= (hours * SECONDS_IN_HOUR);
  const minutes = Math.floor(seconds / SECONDS_IN_MINUTE);
  seconds -= (minutes * SECONDS_IN_MINUTE);

  return {
    hours: formatNumber(hours),
    minutes: formatNumber(minutes),
    seconds: formatNumber(seconds),
  };
};

// from snake_style to camelCase
const transformObjProps = (obj) => {
  obj = JSON.parse(JSON.stringify(obj));

  const keys = Object.keys(obj);
  const snakeStyleKeys = [];

  keys.forEach((key) => {
    if (key.indexOf(`_`) >= 0) {
      snakeStyleKeys.push(key);

      const keyInCamelCase = key.split(`_`).map((str, index) => {
        if (!index) {
          return str;
        }

        return `${str[0].toUpperCase()}${str.substr(1)}`;
      }).join(``);

      obj[keyInCamelCase] = obj[key];
    }
  });

  snakeStyleKeys.forEach((key) => {
    delete obj[key];
  });

  return obj;
};

export {
  parseTime,
  transformObjProps,
};
