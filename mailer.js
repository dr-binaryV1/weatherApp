const nodeMailer = require('nodemailer');
var data = require('./db/file/employees.json');

// create reusable transporter object using the default SMTP transport
var transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'developerdamian@gmail.com', // Enter administrative email here
        pass: 'damian101' // Enter Password for email here
    }
});

function mail(body){
    // send mail with defined transport object
    transporter.sendMail(body, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}

function sendEmail(isRainy, position) {
    var rainyMail = {
        from: '"Damian Wynter" <developerdamian@gmail.com>', // sender address
        to: data.employees[position].email, // list of receivers
        subject: 'Work Hours for the upcoming Day!', // Subject line
        text: 'Hello '+data.employees[position].name+
        '\n\n' +
        'Due to the rainy forecast for tomorrow. You are only required to work 4 hours.' +
        '\n\n' +
        'Regards Management' // Email Body
    };

    var sunnyMail = {
        from: '"Damian Wynter" <developerdamian@gmail.com>',
        to: data.employees[position].email,
        subject: 'Work Hours for the upcoming Day!',
        text: 'Hello '+data.employees[position].name+
        '\n\n' +
        'Due to the sunny forecast for tomorrow. You are required to work 8 hours.' +
        '\n\n' +
        'Regards Management'
    };

    var itMail = {
        from: '"Damian Wynter" <developerdamian@gmail.com>',
        to: data.employees[position].email,
        subject: 'Work Hours for the upcoming Day!',
        text: 'Hello '+data.employees[position].name+
        '\n\n' +
        'Due to the rainy forecast for tomorrow. You are not required to hit the streets.' +
        '\n\n' +
        'Regards Management'
    };

    if(isRainy && data.employees[position].role === "IT") {
        mail(itMail);
    } else if(!isRainy) {
        mail(sunnyMail);
    } else if(isRainy) {
        mail(rainyMail);
    }
}

module.exports.mail = mail;
module.exports.sendEmail = sendEmail;