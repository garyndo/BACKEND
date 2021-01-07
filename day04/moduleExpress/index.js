const express = require('express') // funsginya = sebgai pengganti HTTP
const bodyParser = require('body-parser')// tools untuk mengambil data body dr request user
const cors = require('cors')// untuk izin akses
const port = 2000
//make server
const server = express()

//use module
server.use(bodyParser.json())
server.use(cors())
//define method mau get post delete patch dll
//route unutk tampilan home
server.get('/home', (req, res)=>{
    res.status(200).send('<h1>Hello this is Home</h1>')
})

//conncet to all router
const { userRouter } = require('./routers')
server.use('/user', userRouter)

server.listen(port, ()=>console.log(`connected yeuh: ${port}`))
