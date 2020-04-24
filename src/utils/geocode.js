// Request allows you to connect to an external api
const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    // The encodeURIComponent converts spaces to %40% etc.
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYmtqZW5uZXIiLCJhIjoiY2s4cjNyM2tpMDdldDNtcXVxd2ttMHozMCJ9.FsclRBomYOXpz925kJRrRg&limit=1";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

//To test
//geocode("Phoenix", (error, response) => { console.log(response) })
   
module.exports = geocode;