const utils = require("./utils/utils");
const chalk = require("chalk");
const weather = require("./utils/weather");
const geocode = require("./utils/geocode");

const arg = process.argv[2];
if (!arg) {
  return utils.log(chalk.red("Please enter argument"));
} else {
  geocode.geocodeAddress(
    arg,
    (
      error,
      { latitude , longitude , place_name: placename} = {}
    ) => {
      debugger;
      if (error) {
        return console.log(
          chalk.red(
            error.message
            // "Error occurred! Something went wrong while querying your request on MapBox!"
          )
        );
      }
      if (latitude !== null && longitude !== null && placename !== null) {
        weather.getCurrentWeather(
          latitude + "," + longitude,
          (error, { current } = {}) => {
            if (current === undefined) {
              return console.log(
                chalk.red(
                  "Error occurred! Something went wrong while querying your request on WeatherStack!"
                )
              );
            }
            const { weather_descriptions = [], temperature = null, precip = null } = current;
            if (error) {
              utils.log(
                chalk.red(
                  "Error occurred! Something went wrong while querying your request on WeatherStack!"
                )
              );
            } else if (
              !current ||
              !weather_descriptions ||
              weather_descriptions.length === 0
            ) {
              utils.log(
                chalk.red("Error occurred! Unable to find location via MapBox!")
              );
            } else if (current !== null) {
              utils.log(
                chalk.magenta('Current weather of "' + placename + '": ')
              );
              utils.log(
                chalk.green("Weather Description: \n" + weather_descriptions[0])
              );
              utils.log(
                chalk.green(
                  "It is currently " +
                    temperature +
                    " degrees out. There is a " +
                    precip * 100 +
                    "% chance of rain."
                )
              );
            }
          }
        );
      }
    }
  );
}
