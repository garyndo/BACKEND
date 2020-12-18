console.log ('ini satu')// console.log method JS yg synchronus jaaln secara beruturan, ini jalan dlu
console.log ('ini dua')

setInterval(function(){console.log('ini tiga')},3000)// nah ini contoh asynchronus,
                                                    // ga perlu tunggu function beres,
                                                    //dia akan jalan d balik layar, dan melanjutkan perintah brikutnya 

console.log('ini empat')


//KENAPA BISA BEDA?
// fungsi sbnrnya d JS adalah ini, tapi karna kita kemarin paeke create app d npx cmd, 
//                                  ud d siapin tuh modul yg namanya babel, dengan sintax impor dan export