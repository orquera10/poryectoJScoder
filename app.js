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
            cadena+=(i+" - "+auto.modelo+" -- ");
            i+=1;
        });
        alert(cadena);
    }
}
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

function carrera(auto, oponente1, oponente2){
    if (auto.combustible >= 25) {
        num = Math.random() * 100;
        auto.combustible -= 25;
        if (auto.tipo === "Lujo" && num <= 90 && oponente1.tipo !== "Lujo" && oponente2.tipo !== "Lujo") {
            return 25
        } else if (auto.tipo === "Lujo" && num <= 60 && (oponente1.tipo === "Lujo" || oponente2.tipo === "Lujo")) {            
            return 30
        } else if (auto.tipo === "Medio" && num <= 15 && (oponente1.tipo === "Lujo" || oponente2.tipo === "Lujo")) {  
            return 40
        } else if (auto.tipo === "Medio" && num <= 60 && (oponente1.tipo === "Medio" || oponente1.tipo === "Basico") && (oponente2.tipo === "Medio" || oponente2.tipo === "Basico")) {
            return 30
        } else if (auto.tipo === "Basico" && num <= 60 && oponente1.tipo === "Basico" && oponente2.tipo === "Basico") {
            return 30
        } else if (num <= 7) {
            return 50
        }
        else {
            return -15
        }
    } else {
        alert("No tenes combustible")
    }
}
if (localStorage.jugador1=== undefined) {
    
    (async () => {
        const { value: nombre } = await Swal.fire({
            title: 'Ingresa tu nombre',
            input: 'text',
            inputLabel: 'Tu nombre es:',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'Tienes que ingresar tu nombre'
                }
            }
        })

        if (nombre) {
            Swal.fire(`Bienvenido ${nombre}, tenes 100 puntos`)
            // nomUser = nombre
            document.querySelector("#nomUsuario").textContent = nombre
            document.querySelector("#puntos").textContent = "100"
            document.querySelector("#monedas").textContent = "0"
            jugador1 = new Jugador(nombre)
            jugadorJSON = JSON.stringify(jugador1)
            localStorage.setItem("jugador1", jugadorJSON)
        }
    })()
    
} else {
    jugador1 = JSON.parse(localStorage.jugador1)
}
// let nomUser




const btnJugar = document.querySelector("#btnJugar")
const btnGaraje = document.querySelector("#btnGaraje")
const btnTienda = document.querySelector("#btnTienda")
const h2s = document.querySelectorAll("h2")
const pantalla = document.querySelector("#pantalla")

btnJugar.onclick = function pantallaJugar () {
    btnJugar.classList.add("botonActiv")
    h2s[0].setAttribute("style", "font-size: 64px;");
    btnGaraje.classList.remove("botonActiv")
    h2s[1].removeAttribute("style");
    btnTienda.classList.remove("botonActiv")
    h2s[2].removeAttribute("style");

    if (jugador1.autos[0]=== undefined) {
        pantalla.innerHTML = `
            <h1>Selecciona tu Auto</h1>
            <div class="centrar rectangulo">
                <img src="./img/iconoPlus.svg" alt="" id="btnAgregar">
            </div> 
            <button class="botonInac botonActiv m" style="background:grey; cursor:auto"><h2>Correr!!!</h2></button>
        `
        const botonAdd = document.querySelector("#btnAgregar")
        botonAdd.onclick = () => {
            if (jugador1.puntos >= 20 && jugador1.autos.length <=6){
                let autoAux = generarAuto();
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                      confirmButton: 'btn btn-success',
                      cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                  })
                  
                  swalWithBootstrapButtons.fire({
                    title: 'Comprar un auto cuesta 20 puntos',
                    text: "Una vez comprado no se puede revertir!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Si, comprar',
                    cancelButtonText: 'No, cancelar!',
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                        jugador1.sumarPuntos(-20);
                        jugador1.agregarAuto(autoAux)
                        jugadorJSON = JSON.stringify(jugador1)
                        localStorage.setItem("jugador1",jugadorJSON)
                      swalWithBootstrapButtons.fire({
                        title: 'Felicidades!',
                        text: `Obtuviste un ${autoAux.modelo}`,
                        imageUrl: './img/auto01.png',
                        imageWidth: 285,
                        imageHeight: 291,
                        imageAlt: 'Custom image',
                    })
                    pantallaJugar()
                    } else if (
                      /* Read more about handling dismissals below */
                      result.dismiss === Swal.DismissReason.cancel
                    ) {
                      swalWithBootstrapButtons.fire(
                        'Cancelado',
                        'No compraste un auto)',
                        'error'
                      )
                    }
                  })
                  
            }
            
        }
    } else {
        pantalla.innerHTML = `
        <h1 id="titulojugar">Selecciona tu Auto</h1>
        <!-- carrusel -->
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner" id="imgCarrusel">
              
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        <button class="botonInac botonActiv m" id="btnCorrer"><h2>Correr!!!</h2></button>
        `
        const carrusel = document.querySelector("#imgCarrusel")
        for (let i = 0; i < jugador1.autos.length; i++) {
            if (i===0) {
                carrusel.innerHTML += `<div class="carousel-item active">
                <img src="./img/auto01.png" width="290px" class="d-block " alt="...">
                </div>`
            } else {
                carrusel.innerHTML += `<div class="carousel-item">
                <img src="./img/auto01.png" width="290px" class="d-block " alt="...">
                </div>`
            }
        }
        const btnCorrer = document.querySelector("#btnCorrer")
        btnCorrer.addEventListener("click", ()=>{
            let oponente1 = generarAuto();
            let oponente2 = generarAuto();
            document.querySelector("#titulojugar").innerText = "Tus Oponentes"
            btnCorrer.classList.add("invisible")
            document.querySelector("#carouselExampleControls").innerHTML = `
            <div class="centrar">
                <div class="d-flex flex-column align-items-center">
                    <img src="./img/auto01.png" width="290px" alt="" class="mx-2">
                    <h3 class="text-dark">${oponente1.modelo}</h3>
                </div>
                <div class="d-flex flex-column align-items-center">
                    <img src="./img/auto01.png" width="290px" alt="" class="mx-2">
                    <h3 class="text-dark">${oponente2.modelo}</h3>
                </div>
            </div>`
            setTimeout(()=>{
                const puntos = carrera(jugador1.autos[jugador1.autoIndex],oponente1,oponente2)
                jugador1.sumarPuntos(puntos)
                jugadorJSON = JSON.stringify(jugador1)
                localStorage.setItem("jugador1",jugadorJSON)
                if (puntos>0) {
                    Swal.fire('Ganaste la Carrera')
                } else {
                    Swal.fire('Perdiste la Carrera')
                }
            }, 2000);
            setTimeout(()=>{
                pantallaJugar()
            },3000)
        })
    }
}

btnGaraje.onclick = () => {
    btnGaraje.classList.add("botonActiv")
    h2s[1].setAttribute("style", "font-size: 64px;");
    btnJugar.classList.remove("botonActiv")
    h2s[0].removeAttribute("style");
    btnTienda.classList.remove("botonActiv")
    h2s[2].removeAttribute("style");
}
btnTienda.onclick = () => {
    btnTienda.classList.add("botonActiv")
    h2s[2].setAttribute("style", "font-size: 64px;");
    btnJugar.classList.remove("botonActiv")
    h2s[0].removeAttribute("style");
    btnGaraje.classList.remove("botonActiv")
    h2s[1].removeAttribute("style");
}




