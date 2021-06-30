const apiKeyWeatherStack = "fa87e7737367e2dc0f1f671843d6bdce";
const apiBaseUrlWeatherStackCurrent =
  "http://api.weatherstack.com/current?access_key=" +
  apiKeyWeatherStack +
  "&units=f" + 
  "&query=";
const apiBaseUrlWeatherStackForecast =
  "http://api.weatherstack.com/forecast?access_key=" +
  apiKeyWeatherStack +
  "&units=f" + 
  "&query=";;

getAPICurrentUrlWithQuery = (query) => {
    return apiBaseUrlWeatherStackCurrent + query
}
getAPIForecastUrlWithQuery = (query) => {
  return apiBaseUrlWeatherStackForecast + query
}

const apiKeyMapBox = "pk.eyJ1IjoieGVpZXNoYW4iLCJhIjoiY2txamg3ZXFwMDBsNjJubHY2dWd0bnVrNiJ9.bZBlsmnk5sXlmacT6m4Wgw";
getAPIMabBoxBaseUrlWithQuery = (query) => {
  return "https://api.mapbox.com/geocoding/v5/mapbox.places/" +  query + ".json?access_token=" + apiKeyMapBox + '&limit=1'
}


module.exports = {
  getAPICurrentUrlWithQuery,
  getAPIForecastUrlWithQuery,
  getAPIMabBoxBaseUrlWithQuery
};
