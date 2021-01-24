//FOR REGISTER, import module yg d butuhkan, import validation result from express-validator
const { validationResult, Result } = require('express-validator')
const cryptojs = require('crypto-js')
const SECRET_KEY = '!@#$%^&*'

//import database connection
const db = require('../database')
//export controller
module.exports = {
    getAlluser : (req, res) => {
        const userQuery = 'SELECT * FROM USERS'
        db.query(userQuery,(err,result)=>{
            if(err) return res.status(500).send(err)

            res.status(200).send(result)
        })
    },
    login : (req, res) => {
        const {username, password } = req.body

        //hashing password
        const hashpass = cryptojs.HmacMD5(password, SECRET_KEY)
        
        const loginQuery = `SELECT username, email FROM users
                            WHERE username='${username}'
                            AND password=${db.escape(hashpass.toString())}`
        db.query(loginQuery, (err, result)=>{
            if(err) return res.status(500).send(err)
            
            //console log disini tampil dcmd bukan d postman 
            // bentuk resultnya array of object
            console.log(result) 
            //cek apakah login berhasil
            if(result.length === 0) return res.status(400).send('username or pass is wrong')

            res.status(200).send(result[0]) //NOTE klo hanya result hasilnya array of object, klo mau kirim hanya object kita kasih index ke braoa [0]
        })
    },
    register : (req, res) => {
        const { username, password, email} = req.body
        
        // cek dlu apakah ada kesalahan atau engga d dalam validation resultnya
        // validation input from user
        const errors = validationResult(req) //result dr user kita tampung ddlm req utk ngecek
        if(!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)

        //encrypt pass with crypto js
        //NOTE data yang sudah di encrypt oleh crypto js, TIDAK BISA di descrypt/ tidak bisa d lihat lagi 
        const hashpass = cryptojs.HmacMD5(password, SECRET_KEY)
        

        // klo ga ada  eror, proses pnmbhn data user baru berjalan
        const checkUser = `SELECT * FROM users 
                            WHERE username=${db.escape(username)}
                            OR email=${db.escape(email)}`
        db.query(checkUser, (err,result)=>{
            if(err) return res.status(500).send(err)

            //proteksi,apakah d database dgn userame atau email yg sama
            if(result.length !== 0) return res.status(400).send('username or email is already exist')
        
            const regQuery = `INSERT INTO users (username, password, email)
                                VALUES (${db.escape(username)}, ${db.escape(hashpass.toString())}, ${db.escape(email)})`
            db.query(regQuery,(err2, result2)=>{
                if(err2) res.status(500).send(err2)

                res.status(200).send(result2)
            })
            
        })
    }
}