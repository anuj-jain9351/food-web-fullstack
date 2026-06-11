function balance(DB){

var a =  10000;
var b = a-DB;
var c = a+ DB;


return[a, b , c,DB ];
}
let total = balance(500)
console.log("Inisal bank balance=>",total[0])
console.log("debitad amount => ",total[3])
console.log("debitad balance =>",total[1])
console.log("creadetad amount => ",total[3])
console.log("creadet balance =>", total[2])


