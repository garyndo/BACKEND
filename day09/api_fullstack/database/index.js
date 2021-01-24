//import
const mysql = require('mysql')

//9) setup mysql/konek mysql dgn api 
const connection = mysql.createConnection({
    host     : 'localhost',
    port     :  3306, //port default utk mysql
    user     : 'garyndo',
    password : '230694',
    database : 'practice_jcwm15'
})

module.exports = connection