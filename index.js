const express = require('express');
const path = require('path')
const ejs = require('ejs');
const app = express()
const cors = require('cors')
// const db = require('./config/db-config')
const dotenv = require('dotenv').config()
const appRoute = require('./routes/routes');


app.use(cors())
app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express)
app.set('views', './views')

app.use('/', appRoute)

// auth.initialization(app);

app.listen(process.env.PORT,
    console.log(`server running on port ${process.env.PORT}`)
);
