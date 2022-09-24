const express = require('express')
const { response } = require("express")
const mysql = require('mysql')
const dotenv = require('dotenv')
const db = require('../models/index')
const USERS = require('../models/USERS')
const nodemailer = require("nodemailer");
const sendEmail = require('./emailController')
const bcrypt = require('bcrypt');
const randomstring = require("randomstring")
const { check } = require('express-validator')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

const saltRounds = 15;
db.sequelize.sync();


// define mail transporter
let transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};
// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))


const users = db.USERS;
const emailverify = db.emailverify;

module.exports = {
    loginPage: function (req, res) {
        res.render('login', {
            message: ''
        })
    },
    login: async function (req, res) {
        var loginId = req.body.email
        var password = req.body.password
        const result = await users.findOne({ where: { EMAIL: loginId } });
        if (result === null) {
            res.render('login', {
                message: 'User Not Found!'
            })
            console.log('Not found!');
        } else {
            const match = bcrypt.compareSync(password, result.PASSWORD);
            if (match) {
                console.log(match);
                res.send("Successfully logged In")
            } else {
                console.log(match);
                res.render('login', {
                    message: 'Wrong Password!'
                })
            }
        }
        // connection.query('SELECT * FROM USERS WHERE EMAIL = ?', [loginId], function (error, results, fields) {
        //     if (error) {
        //         res.send("Something Went Rong..")
        //     }
        //     else if (results.length != 0) {
        //         console.log(results);
        //         var data = results[0]
        //         if (results[0].PASSWORD == req.body.password) {
        //             res.send("Successfully Logged In")
        //         }
        //         else {
        //             res.send("Wrong Password")
        //         }
        //     }
        //     else {
        //         res.send("Invalid User, Signup")
        //     }
        // })
    },

    registerPage: function (req, res) {
        res.render('register', {
            message: ''
        })
    },
    register: async function (req, res) {
        const password = req.body.password;
        const hash = bcrypt.hashSync(password, saltRounds);
        console.log(hash);
        var data = {
            FIRST_NAME: req.body.firstname,
            LAST_NAME: req.body.lastname,
            EMAIL: req.body.email,
            PASSWORD: hash
        }

        users.create(data)
            .then(data => {
                return res.render('register', {
                    message: 'Your Profile Created Successfully, Now you can login!'
                });
            })
            .catch(err => {
                return res.status(500).send({
                    message: err.message || "Some error occurred while creating the Tutorial."
                });
            });

    },

    forgotPassword: function (req, res) {
        res.render('passwordreset', {
            message: ''
        })
    },

    passwordreset: async function (req, res) {
        const loginId = req.body.email;
        const result = await users.findOne({ where: { EMAIL: loginId } });
        if (result === null) {
            res.render('passwordreset', {
                message: 'Uer not found, Register Please!'
            })
            console.log('Not found!');
        }
        else {
            const tokenstring = randomstring.generate({
                length: 12,
                charset: 'alphabetic'
            });
            console.log(tokenstring);
            const tokendata = {
                EMAIL: loginId,
                TOKEN: tokenstring,
                state: 'ACTIVE',
            }
            emailverify
                .findOne({ where: {EMAIL: loginId} })
                .then(function (data) {
                    // update
                    if (data)
                         data.update({TOKEN: tokenstring});
                    else data = emailverify.create(tokendata);
                    data = JSON.parse(JSON.stringify(data));
                    const tokenstr = data.TOKEN
                    var link = 'http://localhost:3000/verify-email/' + tokenstr;
                    console.log(link);
                    let info = transporter.sendMail({
                        from: "", // sender address
                        to: loginId, // list of receivers
                        subject: "Hello ✔", // Subject line
                        template: 'email', // the name of the template file i.e email.handlebars
                        context: {
                            name: 'User', // replace {{name}} with Adebola
                            url: link,
                            company: tokenstr // replace {{company}} with My Company
                        }
                    });
                })
                .then(tokendata => {
                    res.render('mailsent', {
                        message: 'A password reset link has been sent to your provided email, please click the link to reset your password.',
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.render('mailsent', {
                        message: 'error',
                    })
                })


            // const checktoken = await passwordresetemails.findOne({ where: { EMAIL: loginId } });
            // const abc = checktoken.TOKEN;
            // console.log(abc);


        }
    },
    forgotPasswordEmail: function (req, res) {
        res.send('forgotpasswordemail')
    },

    newPassword: function(req, res) {
        console.log(req.params.token);
        res.render(r)
    }
}
