'use strict';

var mailer = require('./mailer');
var scheduler = require('./scheduler');
var request = require('./requests');
var routes = require('./routes');
var data = require('./db/file/employees.json');
var placeData = require('./db/file/location.json');
var bodyParser = require('body-parser').json;
var express = require('express'),
    app = express();

app.use(bodyParser());
app.use('/', express.static('static' + '/'));
app.use('/', routes);

var port = process.env.PORT || 8080;

app.listen(port, console.log("Server running on port: " + port));

var job = scheduler.scheduleJob(scheduler.rule, function() {
    console.log('Running automated process. Stand By...');

    function callback(result){
        for (var x = 0; x < data.employees.length; x++) {
            for(var y = 0; y < placeData.location.length; y++) {
                if (result.city === placeData.location[y].city &&
                    data.employees[x].city === placeData.location[y].city) {
                    mailer.sendEmail(result.isRainy, x);
                }
            }
        }
    }

    for(var i = 0; i < placeData.location.length; i++) {
        request.makeRequest(placeData.location[i].city, placeData.location[i].country, callback);
    }
});