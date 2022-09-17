const express = require('express');
const path = require('path')
const ejs =  require('ejs');
const app = express()
const auth = require("./utils/auth");

app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express);
app.set('views', './views')


const appRoute = require('./routes/routes');


app.use('/', appRoute)

// auth.initialization(app);

app.listen(3000);
