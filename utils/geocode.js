const constants = require("../constants.js");
const request = require("postman-request");
const utils = require("./utils.js");

const geocode = (address, callback) => {
  const url = constants.getAPIMabBoxBaseUrlWithQuery(address);
  utils.log("URL MapBox: " + url);
  request({ url, json: true }, (error, { body } = {}) => {
    if (body === undefined) {
      callback(
        new Error("Error occurred! Something went wrong while querying your request on MapBox!"),
        {
          latitude: null,
          longitude: null,
          place_name: null,
        }
      );
    } else if (error) {
      callback(
        new Error("Error occurred! Something went wrong while querying your request on MapBox!"),
        {
          latitude: null,
          longitude: null,
          place_name: null,
        }
      );
    } else {
      const { features } = body;
      if (features === undefined) {
        callback(
          new Error("Error occurred! Something went wrong while querying your request on MapBox!"),
          {
            latitude: null,
            longitude: null,
            place_name: null,
          }
        );
      } else if (features.length === 0) {
        callback(
          new Error("Error occurred! Something went wrong while querying your request on MapBox!"),
          {
            latitude: null,
            longitude: null,
            place_name: null,
          }
        );
      } else {
        debugger
        const feature = features[0];
        const { center, place_name } = feature;
        callback(null, {
          latitude: center[1],
          longitude: center[0],
          place_name: place_name,
        });
      }
    }
  });
};

module.exports.geocodeAddress = geocode;
