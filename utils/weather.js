const constants = require("../constants.js");
const request = require("postman-request");
const utils = require("./utils.js");

const getCurrentWeather = (query, callback) => {
  const url = constants.getAPICurrentUrlWithQuery(query);
  utils.log("URL WeatherStack: " + url);
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback(error, null);
    } else {
      const response1 = response;
      const body = response1.body;
      callback(null, body);
    }
  });
};

module.exports.getCurrentWeather = getCurrentWeather;