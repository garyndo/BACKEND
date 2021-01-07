const express = require('express') // funsginya = sebgai pengganti HTTP
const bodyParser = require('body-parser')// tools untuk mengambil data body dr request user
const cors = require('cors')// untuk izin akses
const port = 2000
//make server
const server = express()

//use module
server.use(bodyParser.json())
server.unsubscribe(cors())

let database = [
    {
        username: "Lisa",
        password: "lisa123",
        email: "lisa@gmail.com",
    },
    {
        username: "Jennie",
        password: "jennie123",
        email: "jennie@yahoo.com",
    },
    {
        username: "Rose",
        password: "rose123",
        email: "rose@hotmail.com",
    }
]

//define method mau get post delete patch dll
server.get('/home', (req, res)=>{
    res.status(200).send('<h1>Hello this is Home</h1>')
})

server.get('/users',(req,res)=>{
    res.status(200).send(database)
})

server.post('/login', (req, res) =>{
    //untuk mendapatkan inputan dr user, pake re1.body
    //akan masuk ke dalam req.body
    const {username, password} = req.body
    let userIndex = database.findIndex(
        (item) => item.username == username && item.password == password
    )
    //kita bisa kasih respon untuk case ketika ada kesalahan 
    if(userIndex == -1)return res.status(400).send('invalid')
    res.status(200).send(database[userIndex])
})

server.post('/register', (req,res)=>{
    // const {username, password, email} = req.body

    database.push(req.body)

    res.status(200).send(database)
})
// server.post('/register',(req,res)=>{
//     const {username, password, email} = req.body
//     let userIndex = database.findIndex(
//         (item) => item.username == username 
//     )
// })

server.listen(port, ()=>console.log(`connected yeuh: ${port}`))
