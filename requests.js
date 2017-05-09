var request = require('request');
var placeData = require('./db/file/location.json');

function makeRequest(city, country, callback) {
    request('http://api.openweathermap.org/data/2.5/forecast?q='+city+','+country+'&APPID=c1613ca88533a7c37a4cae3147fdaab0',
        function (error, response, body) {
            var jsonBody = JSON.parse(body); // Convert response body to JSON object
            var isRainy = false;
            for (var i = 8; i < 13; i++) {
                // Test forecast for the entire day to inform employees of hours to work
                for(var y = 0; y < placeData.location.length; y++) {
                    if(city === placeData.location[y].city){
                        if (jsonBody.list[i].weather[0].main === "Rain") isRainy = true;
                    }
                }
            }

        for(var x = 0; x < placeData.location.length; x++ ) {
            if (city === placeData.location[x].city) {
                callback({
                    "city": placeData.location[x].city,
                    "isRainy": isRainy
                });
            }
        }
    });
}

module.exports.makeRequest = makeRequest;