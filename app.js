class Jugador{
    constructor(nombre){
        this.nombre = nombre;
        this.puntos = 100;
        this.autoIndex = 0;
        this.autos = [];
    }
    sumarPuntos = puntos => this.puntos += puntos; 
    agregarAuto = auto => this.autos.push(auto);
    quitarAuto = index => this.autos.splice(index,1);
    elegirAuto = seleccion => this.autoIndex= seleccion - 1;
    mostrarAutos = () => {
        let cadena = "";
        let i = 1;
        this.autos.forEach(auto => {
            cadena+=(i+" - "+auto.modelo+" ");
            i+=1;
        });
        alert(cadena);
    }
}

let nombreJugador = prompt("Ingresa tu nombre").toLocaleUpperCase();
let jugador1 = new Jugador(nombreJugador);
alert("Bienvenido "+jugador1.nombre+", tenes 100 puntos");

class Automobil{
    constructor(modelo, tipo){
        this.modelo = modelo;
        this.tipo = tipo;
        this.combustible = 100;
        this.estado = "optimo";
        this.mejoras = [];
    }
    reparar = () => this.estado = "optimo";
    recargar = () => this.combustible = 100;
    
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

// function generarAutoJugador() {
//     alert("Tenes 5 oportunidades para generar un auto")
//     continuar = "si";
//     cont = 4;
//     alert("Tu primer auto es...")
//     autoAux = generarAuto();
//     alert(autoAux.modelo +" "+autoAux.tipo);
//     while (continuar.toLowerCase() ==="si"  &&  cont>0 ) {
//         continuar = prompt("Queres generar otro auto? si/no");
//         if (continuar.toLowerCase() === "si") {
//             autoAux = generarAuto();
//             alert(autoAux.modelo +" "+autoAux.tipo);
//             cont--;
//         } else {
//             cont=0;
//         }
        
//     }
//     alert("Tu auto es: " + miAuto.modelo +" Tipo: "+miAuto.tipo);
//     return miAuto;
// }

function carrera(auto){
    if (auto.combustible >= 25) {
        oponente1 = generarAuto();
        alert("Tu oponente 1 es: " + oponente1.modelo + " Tipo: " + oponente1.tipo);
        oponente2 = generarAuto();
        alert("Tu oponente 2 es: " + oponente2.modelo + " Tipo: " + oponente2.tipo);
        num = Math.random() * 100;
        alert("Inicia la carrera")
        auto.combustible -= 25;
        if (auto.tipo === "Lujo" && num <= 90 && oponente1.tipo !== "Lujo" && oponente2.tipo !== "Lujo") {
            alert("Ganasteeeeee, sumaste 25 puntos");
            return 25
        } else if (auto.tipo === "Lujo" && num <= 60 && (oponente1.tipo === "Lujo" || oponente2.tipo === "Lujo")) {
            alert("Ganasteeeeee, sumaste 30 puntos");
            return 30
        } else if (auto.tipo === "Medio" && num <= 15 && (oponente1.tipo === "Lujo" || oponente2.tipo === "Lujo")) {
            alert("Ganasteeeeee, sumaste 40 puntos");
            return 40
        } else if (auto.tipo === "Medio" && num <= 60 && (oponente1.tipo === "Medio" || oponente1.tipo === "Basico") && (oponente2.tipo === "Medio" || oponente2.tipo === "Basico")) {
            alert("Ganasteeeeee, sumaste 30 puntos");
            return 30
        } else if (auto.tipo === "Basico" && num <= 60 && oponente1.tipo === "Basico" && oponente2.tipo === "Basico") {
            alert("Ganasteeeeee, sumaste 30 puntos");
            return 30
        } else if (num <= 7) {
            alert("Ganasteeeeee, sumaste 50 puntos");
            return 50
        }
        else {
            alert("Perdiste, restaste 15 puntos");
            return -15
        }
    } else {
        alert("No tenes combustible")
    }


}

let op = 1;
while (op !== 3) {
    op = Number(prompt("ELIGE UNA OPCION: 1-CORRER CARRERA 2-GARAGE 3-SALIR"))
    switch (op) {
        case 1:
            if (jugador1.autos.length === 0) {
                alert("No tenes autos en tu garage!!! (ingresa al garage y compra autos)")
            } else {
                alert("A COMPETIR!!!")
                op = prompt("Estas listo para correr? si/no");
                if (op.toLowerCase() === "si") {
                    jugador1.sumarPuntos(carrera(jugador1.autos[jugador1.autoIndex]));
                } else {
                    alert("Volviendo al menu principal")
                }

            }
            break;
        case 2:
            op2 = Number(prompt("ELIGE UNA OPCION: 1-ELEGIR AUTO 2-CONSEGUIR AUTOS 3-SALIR"));
            switch (op2) {
                case 1:
                    if (jugador1.autos.length === 0) {
                        alert("No tenes autos (entra a la opcion conseguir autos)")
                    } else {
                        alert("Elegi un auto")
                        jugador1.mostrarAutos();
                        op3 = prompt("Ingresa el auto elegido:")
                        jugador1.elegirAuto(op3);
                    }
                    break;
                case 2:
                    alert("Generar un auto nuevo te cuesta 20puntos");
                    if (jugador1.puntos >= 20) {
                        autoAux = generarAuto();
                        jugador1.sumarPuntos(-20);
                        alert("obtuviste un "+ autoAux.modelo);
                        op4 = prompt("quieres agregar este auto a tu garage? si/no (tenes una capacidad de 10 autos)");
                        if (op4.toLowerCase() === "si") {
                            if (jugador1.autos.length <= 3) {
                                jugador1.agregarAuto(autoAux)
                                alert("Auto nuevo agregado, se regresara al garage");
                            } else {
                                alert("Tu garage esta lleno")
                                op = prompt("quitar un auto para agregar el nuevo? si/no")
                                if (op.toLowerCase() === "si") {
                                    alert("Elegi un auto")
                                    jugador1.mostrarAutos();
                                    op3 = Number(prompt("Ingresa el auto elegido:"));
                                    jugador1.quitarAuto(op3 - 1)
                                    if (op3 === 1) {
                                        jugador1.elegirAuto(1)
                                    }
                                    alert("Auto eliminado");
                                    jugador1.agregarAuto(autoAux);
                                    alert("Auto nuevo agregado, se regresara al garage");
                                } else {
                                    alert("No se agrego el auto, se regresara al garage")
                                }
                            }
                        }
                    } else {
                        alert("Tenes menos de 20 puntos y no podes comprar autos, se regresara al garage");
                    }
                    break;

                default:
                    alert("Regresando al menu principal")
                    break;
            }
            break;
        default:
            alert("Gracias por jugar...")
            op=3;
            break;
    }
}

// let autoJugador = generarAutoJugador();
// let puntos=0;
// let resp="si";




// while (autoJugador.combustible>=25 && resp==="si") {
//     resp = prompt("Queres participar de una carrera? si/no")
//     if (resp.toLowerCase()==="si") {
//         puntos+=carrera(autoJugador);
//     } else {
//         alert("Gracias por jugar tu puntaje es: "+puntos)
//     }
// }
// if (autoJugador.combustible<=0) {
//     alert("Gracias por jugar tu puntaje es: "+puntos)
// }