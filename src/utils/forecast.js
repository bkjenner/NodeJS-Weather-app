const request = require('request')

const forecast = (latitude, longitude, callback) => {
    let url =
  "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&appid=0a8e762eb5369d72a802f6986432e41e&units=imperial";

  request({ url: url }, (error, response) => {
    if (error) {
        callback('Unable to connect to weather service!', undefined)
    } else {
      const data = JSON.parse(response.body);
      if (data.cod) {
        callback(data.message, undefined)
      } else {
        callback(undefined, ' It is currently ' + data.current.weather[0].description + ' with a temperature of ' + data.current.temp)
      }
    }
  });
}

//To test
//forecast(33.227,-111.611, (error, response) => { console.log(response) })
   
module.exports = forecast

