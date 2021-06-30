const utils = require("./utils");
const chalk = require("chalk");
const request = require("postman-request");
const constants = require("./constants.js");

getWeatherCurrentWithQuery = (query, placeName) => {
  const url = constants.getAPICurrentUrlWithQuery(query);
  utils.log("URL WeatherStack: " + url);
  request({ url: url, json: true }, (error, response) => {
    try {
      debugger;
      // utils.log(chalk.green(JSON.parse(response)));
      const response1 = response;
      const body = response1.body;
      const current = body.current;
      utils.log(chalk.magenta('Current weather of "' + placeName + '": '));
      utils.log(
        chalk.green("Weather Description: \n" + current.weather_descriptions[0])
      );
      utils.log(
        chalk.green(
          "It is currently " +
            current.temperature +
            " degrees out. There is a " +
            current.precip +
            "% chance of rain."
        )
      );
    } catch (e) {
      utils.log(chalk.red("Error occurred! Something went wrong while querying your request on WeatherStack!"));
    }
  });
};

getWeatherForecastWithQuery = (query) => {
  const url = constants.getAPIForecastUrlWithQuery("Lahore");
  utils.log("URL WeatherStack: " + url);
  request({ url: url, json: true }, (error, response) => {
    debugger;
    // utils.log(chalk.green(JSON.parse(response)));
    const response1 = response;
    const body = response1.body;
    const current = body.current;
    utils.log(chalk.magenta("FORECAST: "));
    utils.log(chalk.green(JSON.stringify(current)));
  });
};

getMapBoxGeoCodeWithQuery = (query) => {
  const url = constants.getAPIMabBoxBaseUrlWithQuery(query);
  utils.log("URL MapBox: " + url);
  request({ url: url, json: true }, (error, response) => {
    try {
      debugger;
      const response1 = response;
      const body = response1.body;
      const features = body.features;
      const feature = features[0];
      const center = feature.center;
      const placeName = feature.place_name;
      getWeatherCurrentWithQuery(center.join(","), placeName);
    } catch (e) {
      utils.log(chalk.red("Error occurred! Something went wrong while querying your request on MapBox!"));
    }
  });
};
const arg = process.argv[2];
utils.log(arg);
getMapBoxGeoCodeWithQuery(arg);
