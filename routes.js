const express = require('express'); 
const app = express.Router();
const loginController=require('./controllers/loginController')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/',loginController.loginPage)
app.get('/login',loginController.loginPage)
app.post('/login', loginController.login)

app.get('/register', loginController.registerPage)
app.post('/register',loginController.register)
app.get('/forgot-password', loginController.forgotPassword);
app.post('/passwordresetmail', loginController.passwordreset)
app.get('/forgotpasswordemail', loginController.forgotPasswordEmail)
app.get('/verify-email/:token', loginController.newPassword);


module.exports = app;
  