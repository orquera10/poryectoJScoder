let numero1=5;
let numero2=6;
let suma=numero1+numero2;
let producto=numero1*numero2;
let sum=suma;
for (let i = 0; i < 10; i++) {
    if (sum%2===0) {
        
        document.write("<h2 class='titulo'>la suma es: "+sum+"</h2>")
    } else{
        document.write("<h2 class='titulo'>numero impar</h2>")
    }
    sum+=numero2+i;
    
}
document.write(Number(suma))

document.write("<h2 class='titulo'>la suma es: "+Number(numero1+numero2)+"</h2><h2 class='titulo'>el producto es: "+producto+"</h2>")

const dario=23

console.log(dario)
