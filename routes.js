var express = require('express');
var request = require('./requests');
var router = express.Router();
var data = require('./db/file/employees.json');
var mailer = require('./mailer');

router.get('/forecast', function(req, res){
    var jsonBody = [];
    var callback = function(resp){
        jsonBody.push(resp);
        if(jsonBody.length === 2) {
            res.json(jsonBody);
        }
    };

    request.makeRequest("Mobay", "jm", callback);
    request.makeRequest("Kingston", "jm", callback);
});

router.post('/forecast', function(req, res, next) {
   function getMailTemplate(position) {
       return {
           from: '"Damian Wynter" <developerdamian@gmail.com>',
           to: data.employees[position].email,
           subject: 'Work Hours for the upcoming Day!',
           text: 'Hello ' + data.employees[position].name +
           '\n\n' + req.body.body
       };
   }

        for (var x = 0; x < data.employees.length; x++) {
            if (req.body.recipients === "IT") {
                if (data.employees[x].city === req.body.city && data.employees[x].role === "IT") {
                    mailer.mail(getMailTemplate(x));
                }
            } else if (req.body.recipients === "Indoor") {
                if (data.employees[x].city === req.body.city && data.employees[x].role !== "IT") {
                    mailer.mail(getMailTemplate(x));
                }
            } else {
                if (data.employees[x].city === req.body.city) {
                    mailer.mail(getMailTemplate(x));
                }
            }
        }
   res.json("Email sent to employee(s) successfully!");
   next();
});

module.exports = router;