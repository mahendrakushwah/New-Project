const dotenv = require('dotenv')
const nodemailer = require("nodemailer");

module.exports = { 
    sendEmail(mailTo, mailSubject, mailBody){
    var transporter = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
          user: process.env.MAIL_FROM,
          pass: process.env.MAIL_PASSWORD,
          host: process.env.MAIL_HOST
          
        }
      });
      
    //   var mailOptions = {
    //     from: auth.user,
    //     to: mailTo,
    //     subject: 'Sending Email using Node.js',
    //     text: 'That was easy!'
    //   };
      
}}

