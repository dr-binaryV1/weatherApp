var request = require('request');
var placeData = require('./db/file/location.json');

function makeRequest(city, country, callback) {
    request('http://api.openweathermap.org/data/2.5/forecast/daily?q='+city+','+country+'&cnt=5&APPID=c1613ca88533a7c37a4cae3147fdaab0',
        function (error, response, body) {
            var jsonBody = JSON.parse(body); // Convert response body to JSON object
            var forecast = [];

            for (var i = 0; i < jsonBody.list.length; i++) {
                var isRainy = false;
                // Test forecast for the entire day to inform employees of hours to work
                for(var y = 0; y < placeData.location.length; y++) {
                    if(city === placeData.location[y].city){
                        if (jsonBody.list[i].weather[0].main === "Rain") isRainy = true;
                        forecast.push({
                            isRainy: isRainy,
                            dateTime: jsonBody.list[i].dt,
                            desc: jsonBody.list[i].weather[0].description,
                            main: jsonBody.list[i].weather[0].main
                         });
                    }
                }
            }

            for(var x = 0; x < placeData.location.length; x++ ) {
                if (city === placeData.location[x].city) {
                    callback({
                        "city": placeData.location[x].city,
                        "forecast": forecast
                    });
                }
            }
    });
}

module.exports.makeRequest = makeRequest;