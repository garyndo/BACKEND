// BUAT API NIH BOY
// SET UP DLU NPM INIT, NPM I EXPRESS BODYPARSER SAMA CORS D CMD/TERMINAL
//1)setup/import modul
const express = require('express') // pebuat server pengganti httpmodul
const bodyParser = require('body-parser') // unutk menampung req.body request on body, 
const cors = require('cors') // izin sharing data, API ini bisa d akses sm localhost apapun yg kita buat
//8)import modul sql
const mysql = require('mysql') // MODUL utk menyambung API dgn mySQL db
//2) create app
const app = express()

//3)apply middleware
app.use(cors())
app.use(bodyParser.json())

//10) import database
const db = require('./database')

db.connect((err)=>{
    if(err) return console.log(`connecting error : ${err.stack}`)
    console.log(`connected as id : ${db.threadId}`)
})

//4) create home route
app.get('/', (req, res) => {
    res.status(200).send('<h1>This is Home</h1>')
})

//15) import router
const {productRouter, userRouter} = require('./routers')
app.use('/product', productRouter)
app.use('/user', userRouter)

//5) kita masukan k dalamlocalhost/hosting
const PORT = 2000
app.listen(PORT,()=> console.log(`connceted to PORT: ${PORT}`))
 //6) cek menggunakan nodemon d terminal, nodemon berguna utk auto running file
 //7) buat modul sql yg menghubungkan API kita dengan mySQL

//NOTE
// untuk menyambungkan table yg ada d database, buat controller dan routenya
// misal kita mau ambil data table product dr mysql kita buat dh tu productcontroller sm productrouter

