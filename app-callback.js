const utils = require("./utils/utils");
const chalk = require("chalk");
const weather = require("./utils/weather");
const geocode = require("./utils/geocode");

const arg = process.argv[2];
if (!arg) {
  return utils.log(chalk.red("Please enter argument"));
} else {
  geocode.geocodeAddress(arg, (error, data) => {
    if (error) {
      utils.log(
        chalk.red(
          "Error occurred! Something went wrong while querying your request on MapBox!"
        )
      );
    } else if (data !== null) {
      const center = data.center;
      const placename = data.place_name;
      weather.getCurrentWeather(center.reverse().join(","), (error, data) => {
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
                current.temperature +
                " degrees out. There is a " +
                current.precip * 100 +
                "% chance of rain."
            )
          );
        }
      });
    }
  });
}
