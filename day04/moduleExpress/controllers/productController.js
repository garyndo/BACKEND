//database
let dbproducts = [
    {
        id: 1,
        name: '"nike-01"',
        price: 2000
    },
    {
        id: 2,
        name: '"nike-02"',
        price: 3000
    }
]
// LATIHAN
// get all product, get product by id, add product, edit product, delete product

module.exports = {
    getProducts: (req,res)=>{
        res.status(200).send(dbproducts)
    }
}