// const mysql = require("mysql");

// const conne = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });


// conne.connect(function(err) {
//   if (err) throw err;
//   console.log('Database is connected successfully !');
// });

// module.exports = conne;





// module.exports = {
//   getConnection() {
//     return new Promise(function (res, rej) {
//       pool.getConnection()
//         .then(function (conn) {
//           res(conn);
//         })
//         .catch(function (error) {
//           rej(error);
//         });
//     });
//   }
// };
