const { product } = require('../controllers')

router.post('/getProduct', product.getProduct)

module.exports = router