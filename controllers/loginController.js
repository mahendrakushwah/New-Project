// const express =  require('express')
// const connection = require("../utils/db")ra


const { response } = require("express")
const userModel = require("../models/user.model")
const mysql = require('mysql')
const dotenv = require('dotenv')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234567890',
    database: 'testApp'
});

module.exports = {
    loginPage: function (req, res) {
        res.render('login')
    },

    login: async function (req, res) {
        // console.log(req.body);
        
        var loginId = req.body.email
        var password = req.body.password
        // const results = Object.values(JSON.parse(JSON.stringify(results)));
        
        connection.query('SELECT * FROM USERS WHERE EMAIL = ?', [loginId], function (error, results, fields) {
            

            if (error) {
                res.send("Something Went Rong..")
            }
            else if (results.length != 0) {
                console.log(results);
                var data = results[0]
                // console.log(data.PASS);
                // console.log(req.body.password);
                if (results[0].PASS == req.body.password) {
                    res.send("Successfully Logged In")
                }
                else {
                    res.send("Wrong Password")
                }
            }
            else {
                res.send("Invalid User, Signup")
            }

        })


        // if (areValid = await userModel.areValidCredentials(loginId, password)) {
        //     res.send("I am good")
        // } else {
        //     res.send("No Check your code")
        // }
    },

    registerPage: function (req, res) {
        res.render('register')
    },

    register: async function (req, res) {
        // console.log(req.body)

        var firstName = req.body.fname
        var lastName = req.body.lname
        var loginId = req.body.email
        var password = req.body.password
        
        // console.log(connection)

        connection.query('insert into USERS(FIRST_NAME, LAST_NAME, EMAIL, PASS) values(?,?,?,?)', [firstName, lastName, loginId, password], function (error, results, fields) {
            if (error) {
                console.log(error);
            }
            else {
                // console.log(results);
                res.send("Created Successfully")
                // res.render('login')
            }
        });
    }
}
