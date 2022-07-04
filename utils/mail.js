const nodemailer = require('nodemailer');
const res = require("express");

const transporter = nodemailer.createTransport({
    service: process.env.EMAILSERVICE,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASS
    }
});

const from = {
    name: 'The CV Engine',
    address: process.env.EMAIL
}

exports.fromEmail = from;
// const mailOptions = {
//     from: 'youremail@gmail.com',
//     to: 'myfriend@yahoo.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
// };

exports.transport = transporter;

exports.sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
