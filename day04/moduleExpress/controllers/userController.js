const { validationResult } = require("express-validator")

//database
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

//export semua controller
module.exports = {
    getUser: (req,res)=>{
        res.status(200).send(database)
    },
    login: (req, res) =>{
        //untuk mendapatkan inputan dr user, pake re1.body
        //akan masuk ke dalam req.body
        const {username, password} = req.body
        let userIndex = database.findIndex(
            (item) => item.username == username && item.password == password
        )
        //kita bisa kasih respon untuk case ketika ada kesalahan 
        if(userIndex == -1)return res.status(400).send('invalid')
        res.status(200).send(database[userIndex])
    },
    register: (req,res)=>{
        // const {username, password, email} = req.body
        let errors = validationResult(req)
        console.log(errors)
        console.log(errors.array())

        //mengambil msg error dari exporees-validator
        const msg = errors.array().map(
            (item) => item.msg
        )
        console.log(msg)
        
        if (!errors.isEmpty()) {
            return res.status(400).send(msg);
        }

        database.push(req.body)
        res.status(200).send(database)
    },
    edit:  (req, res)=>{
        //ambil data dari user yang mau d edit
        let tempUser = database[+req.params.id]
        //buat proteksi
        if(!tempUser) return res.status(400).send(`there is no user with tht indEX ${req.params.id}`)
        console.log(tempUser)
        console.log(req.body)
    
        //looping untuk mengesit data user
        for(let key in req.body){
            for(let key2 in tempUser){
                if(key == key2){
                    tempUser[key2] = req.body[key]
                }
            }
        }
    
        res.status(200).send(database)
    },
    delete:(req, res)=>{
        let tempUser = database[parseInt(req.params.id)]
    
        if(!tempUser) return res.status(400).send(`nope ${req.params.id}`)
    
        database.splice(parseInt(req.params.id), 1)
        res.status(200).send(database)
    }
}