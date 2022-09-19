//  connection without using Sequelize mathod

// const mysql = require('mysql');
// const dotenv = require('dotenv').config()
// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
// });
// db.connect(function (err) {
//     if (err) throw err;
//     console.log('Database is connected successfully !');
//   });
// module.exports=db;
  
module.exports = {

    HOST: "localhost",

    USER: "root",

    PASSWORD: "1234567890",

    DB: "testApp",

    dialect: "mysql",

    pool: {
        max: 5,

        min: 0,

        acquire: 30000,

        idle: 10000
    }
};
