//A. BUAT SERVER/API
//1.import http modul 
var http = require('http')
//2. bikin port
const port = 2000
//import modul fs
var fs = require('fs')
//3.bikin server
const server = http.createServer((req, res) => {
    // console.log(req)
    console.log("URL nya : ", req.url)
    console.log("Headers:", req.headers)
    //bikin routing/rutenya pake if else
    if (req.url == '/users') {
        let user = {
            name: 'Grengky',
            age: 21,
            gender: 'Male'
        }
        res.writeHead(200, { 'Content-Type': 'application/json' }) //200 disini adalah kode status HTTP, artinya klo berhasil reponnya 200
        res.end(JSON.stringify(user)) //data yg d kirim k client harus berupa json
    }
    else if (req.url == '/buah') { 
        let buah = [
            {
                name: 'Avocado',
                color: 'Green'
            },
            {
                name: 'mango',
                color: 'yellow'
            }
        ]
        res.writeHead(200, { 'Content-Type': 'application/json' }) 
        res.end(JSON.stringify(buah))
    }
    //B. BUAT HTML untuk nampilin k usernya, import html pertama, dengan mpodl FS 
    else if(req.url == '/home'){
        let home = fs.readFileSync('home.html', 'utf-8', ()=> console.log('berhasil ini home boy')) //unutk membaca file, dan meng encode sesuatu (utf-8)
        res.writeHead(200, {'content-type' : 'text/html'}) 
        // ketika data yang d amvil menggunakan fs, maka bentuknya adalah string/ datanya uda siap booyy
        res.end(home) //home kita ga perlu  stringify karna klo  pake modul fs bentuknya ud string boy
    }
    //C. gunain databse d beda file
    else if (req.url == '/product'){
        //data yg didapatkan dari hasil fs adalah berbentuk buffer
        let product = fs.readFileSync('product.json')
        console.log(product)   
        //agar data dapat terbaca kembali, harus kita satukan dgn mengubahnya mnjadi string
        console.log(product.toString())
        
        let obj = JSON.parse(product.toString())
        console.log(obj)

        let result = JSON.stringify(obj)
        console.log(result) 

        res.writeHead(200, {'content-type' : 'application/json'})
        res.end(JSON.stringify(obj))
    }
    //misal user ngasih input
    else if(req.url == '/add_product'){
        // 
        let input = '' // menampung inputan user bentunya apa
        //pake komsep buffer stream
        req.on('data',(chunk)=>{ // proses buffer stream masih jalan
            
            console.log(chunk)
            
            input = chunk.toString()

            console.log(input)
        })
        .on('end',()=>{ //pengumpulan data sudah selesaaai
            let obj = JSON.parse(input)  //ubah inputan user jd object 
            console.log(obj)
            //push object k database product
            //ubah product jd object
            let product = JSON.parse(fs.readFileSync('product.json').toString())
            product.push(obj)

            fs.writeFileSync('product.json', JSON.stringify(product))
            res.writeHead(200, {'content-type' : 'text/html'})
            res.end('Add Product Done')
        })
    }
})//GA BS D ENTER KA

server.listen(port, () => console.log(`server running at: ${port}`))

//install nodemon
//gunanya untuk => setiap kita ketik appaun dan ada yg brubah dia lgsung jalan => auto running server

//BUFFER => ketika ada transfer data darai file lain, data dri product misal, ga semuanya langsung masuk k variable product/let product, 
//          js sbnrnya data yg kita kirim itu d pisah2/pecah2 menjadi CHUNK (buffer), setelah itu dkrim dngn cara d kumpulkan(stream) 
//          knapa ga langsung d kirim langsng smuanya? knapa harus d jadiin CHUNK dlu, ketika data sudah banyak datanya smpe tera2 kerja server akan berat
//          case server down data yg masuk banyak dalam satu waktu banyak, itu karna data yg masuk banyak
//          contoh case => steraming youtube putih2 itu chunk lagi d kumpulin              
//          memecah data menajdi byte/satuan data
//          unutk menyatukan s buffer in yg brbentuk byte ita ubah memakau toString booyyy
