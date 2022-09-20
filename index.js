const express = require('express');
const path = require('path')
const ejs = require('ejs');
const cors = require('cors')
const dotenv = require('dotenv').config()
const appRoute = require('./routes');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express()

app.use(flash());

app.use(cors())
app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express)
app.set('views', './views')

app.use('/', appRoute)

// auth.initialization(app);

app.listen(process.env.PORT,
    console.log(`server running on port ${process.env.PORT}`)
);
