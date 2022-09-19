const express = require('express'); 
const app = express.Router();
const loginController=require('../controllers/loginController')
const body_Parser = require('body-parser')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/',loginController.loginPage)
app.get('/login',loginController.loginPage)
app.post('/login', loginController.login)

app.get('/register', loginController.registerPage)
app.post('/register',loginController.register)


// app.get('/',function(req,res){
//     res.render("login")

// })
// app.post('/login', function(req,res){
//     console.log(req.body);
// })

module.exports = app;
  