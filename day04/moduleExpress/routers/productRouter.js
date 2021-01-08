//import method Router dari module express
const router = require('express').Router()
//import controller yg d butuhkan
const { product } = require('../controllers')

router.post('/getProduct', product.getProducts)
router.post('/productbyid/:id', product.productbyid)
router.post('/add', product.add)
router.post('/edit/:id', product.edit)
router.post('/delete/:id', product.delete)

module.exports = router 