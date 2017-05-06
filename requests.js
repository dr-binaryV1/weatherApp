var request = require('request');

var mobayRainy = false;
var kingstonRainy = false;

function makeRequest(city, country, callback) {
    request('http://api.openweathermap.org/data/2.5/forecast?q='+city+','+country+'&APPID=c1613ca88533a7c37a4cae3147fdaab0',
        function (error, response, body) {
            var jsonBody = JSON.parse(body); // Convert response body to JSON object
            for (var i = 8; i < 13; i++) {
                // Test forecast for the entire day to inform employees of hours to work
                switch (city){
                    case "Kingson" : if (jsonBody.list[i].weather[0].main === "Rain") kingstonRainy = true;
                    break;
                    case "Mobay" : if (jsonBody.list[i].weather[0].main === "Rain") mobayRainy = true;
                    break;
                }
            }
            if(city === 'Kingston'){
                callback({
                            "kingstonIsRainy": kingstonRainy,
                            "City": "Kingston"
                });
            } else {
                callback({
                            "mobayIsRainy": mobayRainy,
                            "City": "Mobay"
                });
            }
        });
}

module.exports.makeRequest = makeRequest;
module.exports.mobayIsRainy = mobayRainy;
module.exports.kingstonIsRainy = kingstonRainy;