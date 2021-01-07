//import module/hal2 yg d perlukan
const http = require('http')
//modul utk mmbaca file
const fs = require('fs')
//import url 
const url = require('url')
//tentukan port
const port = 2000
//database didalam => tidak buat dr json
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

//buat servernya 
const server = http.createServer((req,res)=>{
   //akses index untuk edit dari user menggunakan url (pakai query)
        console.log(req.url)
        const alamat = url.parse(req.url)
        console.log(alamat)
    //tamoilin home
    if(req.url == "/home"){
        //ambil data home.html caranya pake readfile
        let home = fs.readFileSync("home.html","utf-8")
        //define headernya, header berisi ttg respon/bentuk data yg d krim 
        res.writeHead(200, {"Content-type" : "text/html"})
        //kirm data k user pake
        res.end(home)
    }
    //tampilin semua user
    else if (req.url == "/users"){
        //ambil data user
        res.writeHead(200, {"content-type":"application/json"})
        res.end(JSON.stringify(database)) //d ubah k stringify
    }
    //fungsi login
    else if (req.url == "/login"){
        //ambil data dari users
        //kita butuh inputan dr user, jadi pake req.on
        let input = ""
        req.on("data", (chunk)=> {
            input = chunk.toString()
            console.log(input)
        }) //klo ud selsesi kita panggil lg req.on
        .on("end",()=>{
            let obj = JSON.parse(input)
            console.log(obj)
            let username = obj.username
            let password = obj.password
            console.log(username, password)
            //unutk mencari index data user d database yang sesuai dengan data yg d kirim oleh user
            let userIndex = database.findIndex(  //findindex = mencari index yg sesuai dengan inputan user
                (item) => item.username == username && item.password == password
            ) 
            console.log(userIndex)
            res.writeHead(200,{"content-type" : "application/json"})
            res.end(JSON.stringify(database[userIndex]))
        })
    }
    //fungsi REGISTER
    else if (req.url == "/register"){
        //kita butuh inputan dr user, jadi pake req.on
        let input = ""
        req.on("data", (chunk) => {
            input = chunk.toString()
            console.log(input)
        })
        .on("end",()=>{
            let obj = JSON.parse(input)
            console.log(obj)
            //push data user baru ke dalam databse
            database.push(obj)
            res.writeHead(200, {"content-type" : "application/json"})
            res.end(JSON.stringify(database))
        })
    }
    //fungsi EDIT
    else if (alamat.pathname == "/edit") {
        let input = ""
        req.on("data", (chunk)=>{
            input = chunk.toString()
            console.log(input)
        })
        .on("end",()=>{
            //get data user yg ingin kita edit
            let itemUser = database[alamat.query]
            console.log(itemUser)

            //ambil data objek yg mau kita edit
            //setelah user masukin data man ayg mau d edit ktia tangkep dlu i
            let obj = JSON.parse(input)
            console.log(obj)

            //edit data sesuai keinginan user
            //for in untuk melooping dalam pbject, klo of ddlm arraty
            for(let key in obj){
                for(let key2 in itemUser){
                    if(key == key2) {
                        itemUser[key2] = obj[key]
                    }
                }
            }
            //ganti databse
            database.splice(alamat.query, 1,itemUser)

            res.writeHead(200,{"content-type" : "application/json"})
            res.end(JSON.stringify(database))
        })
    }
})

//sambungin k portnya
server.listen(port, () => console.log(`connected to port:${port}`))