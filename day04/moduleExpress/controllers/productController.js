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
    },
    add: (req,res)=>{
        dbproducts.push(req.body)
        res.status(200).send(dbproducts)
    },
    edit:  (req, res)=>{
        //ambil data dari product yang mau d edit
        let tempUser = dbproducts[+req.params.id]
        
        //looping untuk mengesit data user
        for(let key in req.body){
            for(let key2 in tempUser){
                if(key == key2){
                    tempUser[key2] = req.body[key]
                }
            }
        }
    
        res.status(200).send(dbproducts)
    },
    delete:(req, res)=>{
        let tempUser = dbproducts[parseInt(req.params.id)]
    
        if(!tempUser) return res.status(400).send(`nope ${req.params.id}`)
    
        dbproducts.splice(parseInt(req.params.id), 1)
        res.status(200).send(dbproducts)
    }
}