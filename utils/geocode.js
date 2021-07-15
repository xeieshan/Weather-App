const constants = require("../constants.js");
const request = require("postman-request");
const utils = require("./utils.js");

const geocode = (address, callback) => {
  const url = constants.getAPIMabBoxBaseUrlWithQuery(address);
  utils.log("URL MapBox: " + url);
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback(error, null);
    } else {
      debugger;
      const response1 = response;
      const body = response1.body;
      const features = body.features;
      const feature = features[0];
      callback(null, feature);
    }
  });
};

module.exports.geocodeAddress = geocode;
