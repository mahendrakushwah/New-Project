// const express =  require('express')
const auth=require("../utils/auth")
const { response } = require("express")
const userModel = require("../models/user.model")


module.exports={
    loginPage:function(req, res){
        res.render('login')
    },

    login:async function(req,res){
        // console.log(req.body);
        var loginId=req.body.email
        var password=req.body.password

        if(areValid = await userModel.areValidCredentials(loginId, password)){
            res.send("I am good")
        }else{
            res.send("No Check your code")
        }


    },
    
    registerPage:function(req, res){
        res.render('register')
    },
    register:function(req, res){
        console.log(req.body)
        res.send("created");
    }
}
