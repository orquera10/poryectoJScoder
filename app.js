class Automobil{
    constructor(modelo, tipo){
        this.modelo = modelo;
        this.tipo = tipo;
        this.combustible = 100;
        this.estado = "optimo";
    }
    reparar(){
        this.estado = "optimo";
    }
    recargar(){
        this.combustible = 100;
    }
}

function modelo(numero){
    num = Math.random()*100;
    switch (numero) {
        case 1:
            if (num<=33) {
                return "Ferrari SF90".toUpperCase()
            } else if(num>33 && num<=66){
                return "Lamborghini Aventador".toUpperCase()
            } else {
                return "Bugatti Chiron".toUpperCase()
            }
            break;
        case 2:
            if (num<=33) {
                return "Fiat Punto"
            } else if(num>33 && num<=66){
                return "Toyota Corolla"
            } else {
                return "Honda Civic"
            }
            break;
        case 3:
            if (num<=33) {
                return "Fiat Mobi"
            } else if(num>33 && num<=66){
                return "Renault Kwid"
            } else {
                return "Chevrolet Spark"
            }
            break;
    }
}
function generarAuto() {
    num = Math.random() * 100;
    if (num <= 10) {
        miAuto = new Automobil(modelo(1), "Lujo");
    } else if (num > 10 && num <= 40) {
        miAuto = new Automobil(modelo(2), "Medio");
    } else {
        miAuto = new Automobil(modelo(3), "Basico");
    }
    return miAuto;
}
function generarAutoJugador() {
    alert("Tenes 5 oportunidades para generar un auto")
    continuar = "si";
    cont = 5;
    while (continuar ==="si"  &&  cont>0 ) {
        autoAux = generarAuto();
        alert(autoAux.modelo +" "+autoAux.tipo);
        continuar = prompt("Queres generar otro auto? si/no");
        cont--;
    }
    alert("Tu auto es: " + miAuto.modelo +" Tipo: "+miAuto.tipo);
    return miAuto;
}
function carrera(auto){
    auto.combustible-=20;
    oponente1 = generarAuto();
    alert("Tu oponente 1 es: "+oponente1.modelo+" Tipo: "+oponente1.tipo);
    oponente2 = generarAuto();
    alert("Tu oponente 2 es: "+oponente2.modelo+" Tipo: "+oponente2.tipo);
    num = Math.random()*100;
    alert("Inicia la carrera")
    if (auto.tipo==="Lujo" && num<=90 && oponente1.tipo !=="Lujo" && oponente2.tipo !== "Lujo") {
        alert("Ganasteeeeee, sumaste 25 puntos");
        return 25
    } else if(auto.tipo==="Lujo" && num<=60 && (oponente1.tipo ==="Lujo" || oponente2.tipo === "Lujo")){
        alert("Ganasteeeeee, sumaste 30 puntos");
        return 30
    } else if(auto.tipo==="Medio" && num<=15 && (oponente1.tipo ==="Lujo" || oponente2.tipo === "Lujo")){
        alert("Ganasteeeeee, sumaste 40 puntos");
        return 40
    } else if(auto.tipo==="Medio" && num<=60 && (oponente1.tipo ==="Medio" || oponente1.tipo ==="Basico") && (oponente2.tipo === "Medio" || oponente2.tipo ==="Basico")){
        alert("Ganasteeeeee, sumaste 30 puntos");
        return 30
    } else if(auto.tipo==="Basico" && num<=60 && oponente1.tipo ==="Basico" && oponente2.tipo ==="Basico"){
        alert("Ganasteeeeee, sumaste 30 puntos");
        return 30
    } else if(num<=7){
        alert("Ganasteeeeee, sumaste 50 puntos");
        return 50
    } 
    else {
        alert("Perdiste, restaste 15 puntos");
        return -15
    }
    
}

let autoJugador = generarAutoJugador();
let puntos=0;
let resp="si";
while (autoJugador.combustible>=20 && resp==="si") {
    resp = prompt("Queres participar de una carrera? si/no")
    if (resp==="si") {
        puntos+=carrera(autoJugador);
    } else {
        alert("Gracias por jugar tu puntaje es: "+puntos)
    }
}
if (autoJugador.combustible<=0) {
    alert("Gracias por jugar tu puntaje es: "+puntos)
}