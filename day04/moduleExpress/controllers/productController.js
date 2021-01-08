//database
let dbproducts = [
    {
        id: 1,
        name: "nike-01",
        price: 2000
    },
    {
        id: 2,
        name: "nike-02",
        price: 3000
    }
]
// LATIHAN
// get all product, get product by id, add product, edit product, delete product

module.exports = {
    getProducts: (req,res)=>{
        res.status(200).send(dbproducts)
    },
    productbyid: (req,res) => {
        //ambil data dari params
        const id = parseInt(req.params.id)
        //ambil data product sesuai index dari params
        let temProd = dbproducts[id]
        //cek apakah tempProduct adaisinya atau tidak
        if(!temProd) return res.status(400).send('produk tidak ada')
        
        res.status(200).send(temProd)
    },
    add: (req,res)=>{
        dbproducts.push(req.body)
        res.status(200).send(dbproducts)
    },
    edit:  (req, res)=>{
        //ambil data dari product yang mau d edit
        let tempProd = dbproducts[+req.params.id]
        
        // proteksi! cek ketersediaan produk yg ingin d edit
        if(!temProd) return res.status(400).send(`product dengan index ${id} tidak d temukan`)

        //looping untuk mengesit data user
        for(let key in req.body){
            for(let key2 in tempProd){
                if(key == key2){
                    tempProd[key2] = req.body[key]
                }
            }
        }
    
        res.status(200).send(dbproducts)
    },
    delete:(req, res)=>{
        let tempProd = dbproducts[parseInt(req.params.id)]
    
        if(!tempProd) return res.status(400).send(`product dengan index ${req.params.id} tidak d temukan`)
    
        dbproducts.splice(parseInt(req.params.id), 1)
        res.status(200).send(dbproducts)
    }
}