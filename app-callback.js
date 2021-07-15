const utils = require("./utils/utils");
const chalk = require("chalk");
const weather = require('./utils/weather');
const geocode = require('./utils/geocode');

geocode.geocodeAddress("Lahore", (error, data) => {
  if (error) {
    utils.log(
      chalk.red(
        "Error occurred! Something went wrong while querying your request on MapBox!"
      )
    );
  } else if (data !== null) {
    const center = data.center;
    const placename = data.place_name;
    weather.getCurrentWeather(center.join(","), (error, data) => {
      const current = data.current;
      if (error) {
        utils.log(
          chalk.red(
            "Error occurred! Something went wrong while querying your request on WeatherStack!"
          )
        );
      } else if (
        !current ||
        !current.weather_descriptions ||
        current.weather_descriptions.length === 0
      ) {
        utils.log(
          chalk.red("Error occurred! Unable to find location via MapBox!")
        );
      } else if (current !== null) {
        utils.log(chalk.magenta('Current weather of "' + placename + '": '));
        utils.log(
          chalk.green(
            "Weather Description: \n" + current.weather_descriptions[0]
          )
        );
        utils.log(
          chalk.green(
            "It is currently " +
              data.temperature +
              " degrees out. There is a " +
              data.precip +
              "% chance of rain."
          )
        );
      }
    });
  }
});
