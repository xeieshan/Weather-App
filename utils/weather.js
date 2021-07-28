const constants = require("../constants.js");
const request = require("postman-request");
const utils = require("./utils.js");

const getCurrentWeather = (query, callback) => {
  const url = constants.getAPICurrentUrlWithQuery(query);
  utils.log("URL WeatherStack: " + url);
  request({ url, json: true }, (error, {body} = {}) => {
    if (body === undefined) {
      callback(new Error('Error occurred! Something went wrong while querying your request on WeatherStack!'), {})
    } else if (error) {
      callback(error, {});
    } else {
      callback(null, body);
    }
  });
};

module.exports.getCurrentWeather = getCurrentWeather;