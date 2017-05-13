const nodeMailer = require('nodemailer');
var data = require('./db/file/employees.json');

// create reusable transporter object using the default SMTP transport
var transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'Enter Email Here', // Enter administrative email here
        pass: 'Enter Password Here' // Enter Password for email here
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
    var body;
    if(isRainy && position === 'IT'){
        body = "Due to the rainy forecast, You are not required to hit the streets tomorrow."
    } else if(isRainy) {
        body = "Due to the rainy forecast, You are required to work only 4 hours tomorrow."
    } else if(!isRainy){
        body = "Due to the sunny forecast, You are required to work 8 hours tomorrow."
    }

    var Mail = {
        from: '"Damian Wynter" <developerdamian@gmail.com>', // sender address
        to: data.employees[position].email, // list of receivers
        subject: 'Work Hours for the upcoming Day!', // Subject line
        text: 'Hello '+data.employees[position].name+
        '\n\n' +
        body +
        '\n\n' +
        'Regards Management' // Email Body
    };

    mail(Mail);
}

module.exports.mail = mail;
module.exports.sendEmail = sendEmail;