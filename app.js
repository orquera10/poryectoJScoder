class Jugador{
    constructor(nombre){
        this.nombre = nombre;
        this.puntos = 100;
        this.autoIndex = 0;
        this.autos = [];
    }
    sumarPuntos = puntos => this.puntos += puntos; 
    agregarAuto = auto => this.autos.push(auto);
    venderAuto = index => {
        if (this.autos[index].tipo === "Lujo") {
            this.puntos += 100
            swal.fire("Recibiste 100 puntos")
        } else if(this.autos[index].tipo === "Medio"){
            this.puntos += 40
            swal.fire("Recibiste 40 puntos")
        } else {
            this.puntos += 10
            swal.fire("Recibiste 10 puntos")
        }
        this.autos.splice(index,1);
    }
    elegirAuto = seleccion => this.autoIndex = seleccion;
}

class Automobil{
    constructor({marca, modelo, tipo, combustible}){
        this.marca = marca;
        this.modelo = modelo;
        this.tipo = tipo;
        this.combustible = combustible;
        this.maxCap = combustible;
        this.estado = "optimo";
        this.mejoras = [];
    }
    reparar = () => this.estado = "optimo";
    recargar = () => this.combustible = this.maxCap;
}

async function pedirAuto(tipo){
    const arrBasico = []
    const res = await fetch(`./data/data.json`)
    const data = await res.json()
    for (const item of data) {
        if (item.tipo === tipo) {
            arrBasico.push(item) 
        }
    }
    // console.log(arrBasico)
    num = Math.floor(Math.random()*arrBasico.length);
    // console.log(arrBasico[num])
    return arrBasico[num]
} 


async function generarAuto() {
    num = Math.random() * 100;
    if (num <= 10) {
        miAuto = new Automobil(await pedirAuto("Lujo"));
    } else if (num > 10 && num <= 40) {
        miAuto = new Automobil(await pedirAuto("Medio"));
    } else {
        miAuto = new Automobil(await pedirAuto("Basico"));
    }
    return miAuto;
}

function carrera(auto, oponente1, oponente2){
    // if (auto.combustible >= 25) {
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
    // } else {
    //     return 0
    // }
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
    jugadorAux = JSON.parse(localStorage.jugador1)
    jugador1 = new Jugador(jugadorAux.nombre) 
    jugador1.puntos = jugadorAux.puntos
    jugador1.autoIndex = jugadorAux.autoIndex

    for (let i = 0; i < jugadorAux.autos.length; i++) {
        const auto = jugadorAux.autos[i];
        autoAux = new Automobil(auto)
        jugador1.autos.push(autoAux)
        jugador1.autos[i].maxCap = auto.maxCap
    }
    

    document.querySelector("#nomUsuario").textContent = jugador1.nombre
    document.querySelector("#puntos").textContent = jugador1.puntos
    document.querySelector("#monedas").textContent = "0"
}


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
        botonAdd.onclick = async () => {
            if (jugador1.puntos >= 20 && jugador1.autos.length <=5){
                let autoAux = await generarAuto();
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
                        document.querySelector("#puntos").textContent = jugador1.puntos
                        jugador1.agregarAuto(autoAux)
                        jugadorJSON = JSON.stringify(jugador1)
                        localStorage.setItem("jugador1",jugadorJSON)
                        swalWithBootstrapButtons.fire({
                        title: 'Felicidades!',
                        text: `Obtuviste un ${autoAux.marca} ${autoAux.modelo}`,
                        imageUrl: `./img/${autoAux.modelo}.png`,
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
                carrusel.innerHTML += `<div class="carousel-item active" id="id0">
                <img src="./img/${jugador1.autos[i].modelo}.png" width="290px" class="d-block " alt="...">
                </div>`
            } else {
                carrusel.innerHTML += `<div class="carousel-item" id="id${i}">
                <img src="./img/${jugador1.autos[i].modelo}.png" width="290px" class="d-block " alt="...">
                </div>`
            }
        }
        
        
        
        const btnCorrer = document.querySelector("#btnCorrer")
        btnCorrer.addEventListener("click", async ()=>{
            for (let i = 0; i < jugador1.autos.length; i++) {
                idAuto = document.querySelector("#id"+i);
                if(idAuto.classList.contains("active")){
                    jugador1.elegirAuto(i)
                    jugadorJSON = JSON.stringify(jugador1)
                    localStorage.setItem("jugador1", jugadorJSON)
                }
            }
            let oponente1 = await generarAuto();
            let oponente2 = await generarAuto();
            document.querySelector("#titulojugar").innerText = "Tus Oponentes"
            btnCorrer.classList.add("invisible")
            document.querySelector("#carouselExampleControls").innerHTML = `
            <div class="centrar">
                <div class="d-flex flex-column align-items-center">
                    <img src="./img/${oponente1.modelo}.png" width="290px" alt="" class="mx-2">
                    <h3 class="text-dark">${oponente1.modelo}</h3>
                </div>
                <div class="d-flex flex-column align-items-center">
                    <img src="./img/${oponente2.modelo}.png" width="290px" alt="" class="mx-2">
                    <h3 class="text-dark">${oponente2.modelo}</h3>
                </div>
            </div>`
            
                if (jugador1.autos[jugador1.autoIndex].combustible < 20) {
                    Swal.fire('Tu auto no tiene Combustible')
                } else {
                    setTimeout(()=>{
                    const puntos = carrera(jugador1.autos[jugador1.autoIndex],oponente1,oponente2)
                    if (puntos>0) {
                        // Swal.fire('Ganaste la Carrera')
                        Swal.fire({
                            title: 'Ganaste!',
                            text: 'felicitaciones terminaste primero.',
                            imageUrl: './img/ganaste.png',
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: 'Custom image',
                          })
                    } else {
                        // Swal.fire('Perdiste la Carrera')
                        Swal.fire({
                            title: 'Perdiste!',
                            text: 'Tu auto no aguanto la carrera',
                            imageUrl: './img/perdiste.png',
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: 'Custom image',
                          })
                    }
                    jugador1.sumarPuntos(puntos)
                    if (jugador1.puntos < 20) {
                        jugador1.puntos = 0
                    }
                    jugadorJSON = JSON.stringify(jugador1)
                    localStorage.setItem("jugador1", jugadorJSON)
                    document.querySelector("#puntos").textContent = jugador1.puntos
                    }, 2000);
                    
                }
                setTimeout(()=>{
                    pantallaJugar()
                }, 3000)
                
            
            
        })
    }
}



btnGaraje.onclick = function pantallaGaraje () {
    btnGaraje.classList.add("botonActiv")
    h2s[1].setAttribute("style", "font-size: 64px;");
    btnJugar.classList.remove("botonActiv")
    h2s[0].removeAttribute("style");
    btnTienda.classList.remove("botonActiv")
    h2s[2].removeAttribute("style");


    if (jugador1.autos[0]=== undefined) {
        pantalla.innerHTML = `
            <h1>Compra Autos</h1>
            <div class="centrar rectangulo">
                <img src="./img/iconoPlus.svg" alt="" id="btnAgregar">
            </div> 
        `
        const botonAdd = document.querySelector("#btnAgregar")
        botonAdd.onclick = async () => {
            if (jugador1.puntos >= 20 && jugador1.autos.length <=5){
                let autoAux = await generarAuto();
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
                        document.querySelector("#puntos").textContent = jugador1.puntos
                        jugador1.agregarAuto(autoAux)
                        jugadorJSON = JSON.stringify(jugador1)
                        localStorage.setItem("jugador1",jugadorJSON)
                        swalWithBootstrapButtons.fire({
                        title: 'Felicidades!',
                        text: `Obtuviste un ${autoAux.marca} ${autoAux.modelo}`,
                        imageUrl: `./img/${autoAux.modelo}.png`,
                        imageWidth: 285,
                        imageHeight: 291,
                        imageAlt: 'Custom image',
                    })
                    pantallaGaraje()
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
    } else{
        pantalla.innerHTML = `
        <h1 id="titulojugar">Tus autos</h1>
        <div class="centrar contImagenes" id="contenedorImg">
                
        </div>
        <button class="botonInac botonActiv m" id="btnComprar"><h2>Comprar Auto</h2></button>
        `
        const carrusel = document.querySelector("#imgCarrusel")
        const contenedorImg = document.querySelector("#contenedorImg")
        const btnComprar = document.querySelector("#btnComprar")

        for (let i = 0; i < jugador1.autos.length; i++) {
            contenedorImg.innerHTML += `
                <div class="centrar flex-column position-relative tarjeta">
                    <img src="./img/${jugador1.autos[i].modelo}.png"  alt="">
                    <div class="dropdown position-absolute bottom-0 end-0">
                        <button class="btn btn-secondary rounded-circle" style="height:61px; width:61px" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="./img/iconMenu.svg" style="height:15px; width:15px" alt="">
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item llenarTanque" href="#">Llenar Tanque</a></li>
                            <li><a class="dropdown-item ventaAuto" href="#">Vender</a></li>
                            <li><a class="dropdown-item" href="#">Reparar</a></li>
                        </ul>
                    </div>
                </div>
                
            `
        }
        const tanques = document.querySelectorAll(".llenarTanque")
        const ventas = document.querySelectorAll(".ventaAuto")
        // console.log(tarjetas[0].textContent)
        for (let i = 0; i < tanques.length; i++) {
            const tanque = tanques[i];
            const venta = ventas[i];
            tanque.onclick = () => {
                if (jugador1.puntos<40) {
                    swal.fire("No tenes suficientes puntos")
                } else if (jugador1.autos[i].combustible === jugador1.autos[i].maxCap) {
                        swal.fire("Tenes el tanque lleno")
                    } else{
                        jugador1.autos[i].recargar()
                        jugador1.puntos-=40;
                        document.querySelector("#puntos").textContent = jugador1.puntos
                        jugadorJSON = JSON.stringify(jugador1)
                        localStorage.setItem("jugador1", jugadorJSON)
                        swal.fire("Recargaste Combustible, te salio 40 creditos")
                }  
            }
            venta.onclick = () => {
                jugador1.venderAuto(i)
                jugadorJSON = JSON.stringify(jugador1)
                localStorage.setItem("jugador1", jugadorJSON)
                document.querySelector("#puntos").textContent = jugador1.puntos
                pantallaGaraje();    
            }
                
        }

        btnComprar.onclick = async () => {
            if (jugador1.puntos >= 20 && jugador1.autos.length <=5){
                let autoAux = await generarAuto();
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
                        document.querySelector("#puntos").textContent = jugador1.puntos
                        jugador1.agregarAuto(autoAux)
                        jugadorJSON = JSON.stringify(jugador1)
                        localStorage.setItem("jugador1",jugadorJSON)
                        swalWithBootstrapButtons.fire({
                        title: 'Felicidades!',
                        text: `Obtuviste un ${autoAux.marca} ${autoAux.modelo}`,
                        imageUrl: `./img/${autoAux.modelo}.png`,
                        imageWidth: 285,
                        imageHeight: 291,
                        imageAlt: 'Custom image',
                    })
                    pantallaGaraje()
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
                  
            } else if(jugador1.autos.length ===6) {
                Swal.fire('Tenes lleno el garaje')
            } else if(jugador1.puntos < 20) {
                Swal.fire('No tenes puntos')
            }
        }
    }
}

btnTienda.onclick = () => {
    btnTienda.classList.add("botonActiv")
    h2s[2].setAttribute("style", "font-size: 64px;");
    btnJugar.classList.remove("botonActiv")
    h2s[0].removeAttribute("style");
    btnGaraje.classList.remove("botonActiv")
    h2s[1].removeAttribute("style");

    pantalla.innerHTML = `
    <h1 class="superTitulo text-center">Proximamente...</h1>
        `
}


