const express = require('express')
const { response } = require("express")
const mysql = require('mysql')
const dotenv = require('dotenv')
const db = require('../models/index')
const USERS = require('../models/USERS')

db.sequelize.sync();

const users = db.USERS;
// connection.sequelize.sync();
// db.sequelize.authenticate().then(function () {
//     console.log('Nice! Database looks fine');
// }).catch(function (err) {
//     console.log(err, "Something went wrong with the Database Update!")
// });

module.exports = {
    loginPage: function (req, res) {
        res.render('login')
    },
    login: async function (req, res) {
        var loginId = req.body.email
        var password = req.body.password
        

        // USERS.findAll({where EMAIL =loginId})
        // .then( data => {

        // })
        const project = await login.findOne({ where: { EMAIL: loginId } });
        if (project === null) {
            console.log('Not found!');
        } else {
            console.log(project.EMAIL); // 'My Title'
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
        res.render('register')
    },
    register: async function (req, res) {

        var data = {
            FIRST_NAME: req.body.fname,
            LAST_NAME: req.body.lname,
            EMAIL: req.body.email,
            PASSWORD: req.body.password
        }
        users.create(data)
            .then(data => {
                return res.send("Created");
            })
            .catch(err => {
                return res.status(500).send({
                    message: err.message || "Some error occurred while creating the Tutorial."
                });
            });

        }
        
    }
    
    
    
            // connection.query('insert into USERS(FIRST_NAME, LAST_NAME, EMAIL, PASSWORD) values(?,?,?,?)', [firstName, lastName, loginId, password], function (error, results, fields) {
            //     if (error) {
            //         console.log(error);
            //     }
            //     else {
            //         res.send("Created Successfully")
    
            //     }
            // });