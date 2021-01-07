// var timers = require ('timers') // berntuk import sbnrnya dlm JS => import timers from 'timers'

// timers.setTimeout(function cobawaktu(){
//     console.log('Halo guise! coba timers module nich');
// }, 1000)

//ASSERT MODULE => untuk unit testing, 
//digunakan untuk compare 
// var assert = require('assert')
// var item = ['satu','dua','tiga']

// assert.strictEqual(item.length, 5, "eror strict equal")//artinya -> apakah item length itu lebarnya 5,klo eror ada keteranagan eror? 
// assert.notStrictEqual(item.length, 3, "eror not strict equal")//artinya -> apakah item length itu lebarnya BUKAN 3,klo eror ada keteranagan eror? 


//URL MODULE => mendapatkan informasi dari sebuah lin
var url = require('url')
var link = 'http://localhost:2000/user/jakarta?umur=12&gender=wanita' // link ini kita bisa bedah pake URL, kita bsa dapetin gendernya umurnya asalkotanya dll

var objfFromURL = url.parse(link, true)
console.log(objfFromURL)
//cara ambil host
console.log('host:', objfFromURL.host)
//cara untuk mendapatkan umur gender dgn object
console.log('umur sm gender dlm bentuk obj:', objfFromURL.query)
//cara mendapatkan 12 
console.log('umur:', objfFromURL.query.umur)
//cara mendapatkan gender 
console.log('gender:', objfFromURL.query.gender)
//cara untk mendapatkan umur gender
console.log('search:', objfFromURL.search)

