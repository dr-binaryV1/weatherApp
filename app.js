'use strict';

var mailer = require('./mailer');
var scheduler = require('./scheduler');
var request = require('./requests');
var routes = require('./routes');
var data = require('./db/file/employees.json');
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
            if(result.City === "Kingston") {
                if (data.employees[x].city === "Kingston") mailer.sendEmail(result.kingstonIsRainy, x);
            } else if(result.City === "Mobay") {
                if (data.employees[x].city === "Mobay") mailer.sendEmail(result.mobayIsRainy, x);
            }
        }
    }

    request.makeRequest('Mobay','jm',callback);
    request.makeRequest('Kingston','jm',callback);
});