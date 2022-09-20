const express = require('express'); 
const app = express.Router();
const loginController=require('./controllers/loginController')
const body_Parser = require('body-parser')

// const flash = require('connect-flash');
// const session = require('express-session');
// app.use(flash());
// app.get('/display-message', (req, res) => {
//     res.send(req.flash('message'));
// });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/',loginController.loginPage)
app.get('/login',loginController.loginPage)
app.post('/login', loginController.login)

app.get('/register', loginController.registerPage)
app.post('/register',loginController.register)
app.post('/forgotpassword',loginController.forgotpage)
// app.get('/dashboard',loginController.dashboardPage)

module.exports = app;
  