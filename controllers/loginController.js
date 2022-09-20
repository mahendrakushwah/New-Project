const express = require('express')
const { response } = require("express")
const mysql = require('mysql')
const dotenv = require('dotenv')
const db = require('../models/index')
const USERS = require('../models/USERS')

db.sequelize.sync();

const users = db.USERS;
module.exports = {
    loginPage: function (req, res) {
        res.render('login',{
            message: ''
        })
    },
    login: async function (req, res) {
        var loginId = req.body.email
        var password = req.body.password
        const result = await users.findOne({ where: { EMAIL: loginId } });
        if (result === null) {
            res.render('login',{
                message: 'User Not Found!'
            })
            console.log('Not found!'); 
        } else  {
            if(result.PASSWORD == password){
                console.log(result);
                res.send("Successfully logged In")
            }else{
                res.render('login',{
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
        res.render('register',{
            message:''
        })
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
                return res.render('register',{
                    message:'Your Profile Created Successfully, Now you can login!'
                });
            })
            .catch(err => {
                return res.status(500).send({
                    message: err.message || "Some error occurred while creating the Tutorial."
                });
            });

        },
    forgotpage: async function(req,res){

    },
    dashboardPage: function(req, res){
        res.render('dashboard',{
            message:''
        })
    }
}
