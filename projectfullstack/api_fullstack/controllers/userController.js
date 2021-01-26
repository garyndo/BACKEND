//FOR REGISTER, import module yg d butuhkan, import validation result from express-validator
const { validationResult } = require('express-validator')
const cryptojs = require('crypto-js')

//import helpers
const SECRET_KEY = '!@#$%^&*'
const { generateQuery } = require('../helpers/queryHelp') 

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

                if(result.length === 0)res.status(200).send(result2)
            
                const editUser = `UPDATE users SET `
            })
            
        })
    },
    edit : (req, res)=>{
        const id = parseInt(req.params.id)

        const checkUser = `SELECT * FROM users WHERE id_users = ${id}`
        db.query(checkUser,(err,result)=>{
            if(err) return res.status(500).send(err)

            if (result.length === 0) return res.status(200).send(`user with id: ${id} is not found`)
        
            const editUser = `UPDATE users SET${generateQuery(req.body)} WHERE id_users=${id}`
            // console.log(editUser)
            db.query(editUser, (err2, result2)=>{
                if(err2) return res.status(500).send(err2)

                res.status(200).send(result2)
            })
        })
    },
    editPass: (req, res) => {
        const id = parseInt(req.params.id)

        const checkUser = `SELECT * FROM users WHERE id_users=${db.escape(id)}`

        db.query(checkUser, (err, result)=>{
            if (err) return res.status(500).send(err)

            if (result.length === 0) return res.status(200).send(`user with id : ${id} is not found`) 

            const hashpass = cryptojs.HmacMD5(req.body.password, SECRET_KEY)

            // query change password
            const editPassword = `UPDATE users SET password=${db.escape(hashpass.toString())} WHERE id_users=${id}`
            console.log(editPassword)

            db.query(editPassword, (err2, result2) => {
                if (err2) return res.status(500).send(err2)

                res.status(200).send(result2)
            })

        })
    },
    delete: (req, res) => {
        const checkUser = `SELECT * FROM users WHERE id_users=${db.escape(parseInt(req.params.id))}`

        db.query(checkUser, (err, result)=>{
            if (err) return res.status(500).send(err)

            if (result.length === 0) return res.status(200).send(`user with id : ${parseInt(req.params.id)} is not found`)

            const deleteUser = `DELETE FROM users WHERE id_users=${parseInt(req.params.id)}`

            db.query(deleteUser,(err2, result2)=>{
                if (err2) return res.status(500).send(err2)

                res.status(200).send(result2)
            })
        })
    }
}