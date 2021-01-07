const router = require('express').Router()

const { product } = require('../controllers')

router.post('/getProduct', product.getProducts)
router.post('/add', product.add)
router.post('/edit/:id', product.edit)
router.post('/delete/:id', product.delete)

module.exports = router 