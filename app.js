const utils = require("./utils");
const chalk = require("chalk");
const request = require("postman-request");
const constants = require("./constants.js");

getWeatherCurrentWithQuery = (query) => {
  request(
    { url: constants.getAPICurrentUrlWithQuery(query), json: true },
    (error, response) => {
      debugger;
      // utils.log(chalk.green(JSON.parse(response)));
      const response1 = response;
      const body = response1.body;
      const current = body.current;
      utils.log(chalk.magenta("CURRENT: "));
      utils.log(
        chalk.green("Weather Description: " + current.weather_descriptions[0])
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
    }
  );
};

getWeatherForecastWithQuery = (query) => {
  request(
    { url: constants.getAPIForecastUrlWithQuery("Lahore"), json: true },
    (error, response) => {
      debugger;
      // utils.log(chalk.green(JSON.parse(response)));
      const response1 = response;
      const body = response1.body;
      const current = body.current;
      utils.log(chalk.magenta("FORECAST: "));
      utils.log(chalk.green(JSON.stringify(current)));
    }
  );
};

getMapBoxGeoCodeWithQuery = (query) => {
    request(
        {url: constants.getAPIMabBoxBaseUrlWithQuery(query), json: true}, 
        (error,response) => {
            debugger;
            const response1 = response;
            const body = response1.body;
            const features = body.features;
            const feature = features[0];
            const center = feature.center;
            getWeatherCurrentWithQuery(center.join(","))
        }
    )
}
getMapBoxGeoCodeWithQuery("Karachi");

