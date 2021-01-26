// 11) import database/connectoin
const db = require('../database')

module.exports = {
    getAllProduct: (req, res) => {
        // GET DATA FROM SQL
        const queryProduct = 'SELECT * FROM PRODUCTS' //ambil data dari table product
        db.query(queryProduct, (err, result)=>{
            //cek error 
            if (err) return res.status(400).send(err)
            // cek klo berhasil
            res.status(200).send(result)
        })
    }
}