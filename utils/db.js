const mysql = require('mysql2');
const schedule = require('node-schedule');

// DB Connection
const connection = mysql.createConnection({
    host     : process.env.DBHOST,
    user     : process.env.DBUSER,
    password : process.env.DBPASS,
    database : process.env.DBNAME
});

exports.con = connection

exports.dbConnect = () => {
    connection.connect(function(err) {
        if (err){
            console.log(err);
        }else{
            console.log("DB CONNECTED!");
        }
    });
}

// exports.deleteRows = () => {
//     schedule.scheduleJob('0 * * * *', () => {
//         var sql2 = `select bookid from transactions WHERE issueDate <= DATE_SUB(NOW(), INTERVAL 1 DAY) and status = 'H'`
//         var sql = `UPDATE transactions SET status = 'R', returnDate = NOW() WHERE issueDate <= DATE_SUB(NOW(), INTERVAL 1 DAY) and status = 'H'`;
//         connection.query(sql2, function (err, result) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 connection.query(sql, function (err, result2){
//                     if (err) {
//                         console.log(err);
//                     }else{
//                         result.forEach(function myFunction(i) {
//                             incBookcount(i.bookId);
//                         })

//                         console.log("CRON JOB: UPDATED");
//                     }
//                 });
//             }
//         });
//     })
// }


