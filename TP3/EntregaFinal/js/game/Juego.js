"use strict";
import Tablero from "./Tablero.js";
import Ficha from "./Ficha.js";

let divTemporizador = document.querySelector(".contenedor-temporizador");
let spanTemporizador = document.querySelector("#juego-temporizador");
let firstTime = true;
let reset = false;
let lineasAJugar;

document.addEventListener('DOMContentLoaded', () => {

    let canvas = document.querySelector("#canvas");
    /** @type {CanvasRenderingContext2D} */
    let cantFichas;
    let mouseDown=false;
});

export default class Juego {
  constructor(line) {
    console.log(`Juego creado con ${line + 2} filas y ${line + 3} columnas`);
    this.tablero = new Tablero(line);
    this.j1 = new Ficha("X", this.imgFichaJugadorUno);
    this.j2 = new Ficha("O", this.imgFichaJugadorDos);
    this.turn = this.j1;
    this.fichaSeleccionada = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.isMouseDown = false;
    this.lineasAJugar;
    this.turnoActivo = 'ningun team';
    this.temporizadorID = null;

    this.fichas = [];
    this.canvaJuego = document.getElementById("canvaJuego");
    this.ctx = this.canvaJuego.getContext("2d");

    this.canvaJuego.addEventListener("mousedown", (event) =>
      this.onMouseDown(event)
    );
    // this.canvaJuego.addEventListener("mousedown", (event) => this.iniciarDrag(event));
    this.canvaJuego.addEventListener("mousemove", (event) =>
      this.arrastrarFicha(event)
    );
    window.addEventListener("mouseup", (event) => this.onMouseUp(event)); // Cambiar de canvas a window
  }

  inicializar() {
    const botonJugar = document.getElementById("btnJugar");
    //const botonJugarForm = document.getElementById('btnJugar2');
    if (botonJugar) {
      botonJugar.addEventListener("click", () => this.initGame());
    } else {
      console.log("error en boton jugar");
    }
  }

  drawFrame() {
    this.ctx.clearRect(0, 0, this.canvaJuego.width, this.canvaJuego.height);
    this.tablero.dibujarTablero(this.ctx);
    this.dibujarFichas();
    if (this.fichaSeleccionada) {
      this.fichaSeleccionada.dibujarFicha(this.ctx);
    }
    requestAnimationFrame(() => this.drawFrame());
  }

  initGame() {
    console.log("iniciando juego...");
    this.cambiarPantallas();
    requestAnimationFrame(() => this.drawFrame());
    this.crearFichas();
    this.iniciarTemporizador(302);
    //this.arracarTurno();
  }

  cambiarPantallas() {
    const formLines = document.getElementById("formLineas");
    const fondoJuego = document.getElementById("fondoJuego");
    const portadaJuego = document.getElementById("gamePortada");

    portadaJuego.classList.remove("mostrarJuego");
    portadaJuego.classList.add("taparJuego");
    formLines.classList.add("taparJuego");
    fondoJuego.classList.remove("taparJuego");
  }

  /* mostrarForm(){
      const form = document.getElementById('cartelForm');
      form.classList.remove("cartel");
      form.classList.add("cartel2");
    }*/

    crearFichas() {
        const posXBase = 100;
        const posYBase = 400;
        const separacion = 9; // espacio entre fichas para el efecto de apilamiento

        for (let i = 0; i < 20; i++) { 
            let posX = posXBase + 1 * separacion;
            let posY = posYBase + i * separacion*-2;
            let e1 = "equipo1";
            this.turnoActivo = e1;
            const ficha = new Ficha(posX, posY, e1);
            this.fichas.push(ficha);
        }

        const posXBase2 = 910;
        const posYBase2 = 400;
        //const separacion = 9; // Espacio entre fichas para el efecto de apilamiento

        for (let i = 0; i < 20; i++) { 
            let posX = posXBase2 + 1 * separacion; 
            let posY = posYBase2 + i * separacion*-2;
            let e2 = 'equipo2';
            const ficha = new Ficha(posX, posY, e2);
            this.fichas.push(ficha);
        }
    }

  dibujarFichas() {
    this.fichas.forEach((ficha) => ficha.dibujarFicha(this.ctx));
  }

  cambiarTurno() {
    if(this.turnoActivo==='equipo1'){
      this.turnoActivo = 'equipo2';
    } else if(this.turnoActivo==='equipo2'){
      this.turnoActivo = 'equipo1';
    } else {
      return;
    }
  }

  onMouseDown(event) {
    this.isMouseDown = true;
    const rect = this.canvaJuego.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.fichas.forEach((ficha) => {
      
      if (ficha.esClickeada(x, y)) {
        this.fichaSeleccionada = ficha;
        console.log(this.fichaSeleccionada.getEquipo());
        console.log(this.turnoActivo);
        this.offsetX = x - ficha.posX;
        this.offsetY = y - ficha.posY;
        
        console.log("Ficha seleccionada para arrastrar");
      }
    });
  }

  arrastrarFicha(event) {
    if (this.isMouseDown && this.fichaSeleccionada && this.fichaSeleccionada.getEquipo() === this.turnoActivo) {
      const rect = this.canvaJuego.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      this.fichaSeleccionada.posX = x - this.offsetX;
      this.fichaSeleccionada.posY = y - this.offsetY;

      //this.drawFrame();
    }
  }

  onMouseUp(event) {
    this.isMouseDown = false;

    if (this.fichaSeleccionada) {
      const rect = this.canvaJuego.getBoundingClientRect();

      if (this.tablero.isInZoneDrop(this.fichaSeleccionada, this.ctx)) {
          if (this.tablero.verifyWinner(this.fichaSeleccionada)) {
            console.log("ganaste");
            this.endGame();
          } else if (this.tablero.isFull()) {
            this.endGame();
          } else {
            this.cambiarTurno();
          }
      } else {
        console.log("Ficha fuera de zona válida, regresando...");
        this.fichaSeleccionada.resetPosicion();
      }
      this.fichaSeleccionada = null;
    }
    this.drawFrame();
  }

  endGame() {
    const modal = document.getElementById('modal');
    const msjGanador = document.getElementById('winner-message');
    const formLines = document.getElementById("formLineas");

    // Mostrar mensaje de ganador en el modal
    modal.classList.remove('taparJuego');
    msjGanador.innerHTML = `¡Felicidades, ${this.fichaSeleccionada.getEquipo()}! Ha ganado.`;
    console.log("terminó el juego...");

    // Acción al hacer clic en "Jugar de nuevo"
    document.getElementById('play-again-btn').onclick = () => {
        modal.classList.add('taparJuego'); // Oculta el modal
        this.resetGame(); // Reinicia el juego y prepara el formulario
    };
}

resetGame() {
  const formLines = document.getElementById("formLineas");
  const fondoJuego = document.getElementById("fondoJuego");
  fondoJuego.classList.add('taparJuego');
  formLines.classList.remove('taparJuego');

  // Cancelar cualquier temporizador activo
  if (this.temporizadorID) {
    clearTimeout(this.temporizadorID);
    this.temporizadorID = null;
  }

  // Detener el bucle de animación (requestAnimationFrame)
  cancelAnimationFrame(this.animationFrameId);

  // Reiniciar todas las variables del juego
  this.fichas = [];
  this.turnoActivo = 'equipo1';
  this.fichaSeleccionada = null;
  this.isMouseDown = false;

  if (this.tablero && typeof this.tablero.reiniciarTablero === 'function') {
    this.tablero.reiniciarTablero();
  }

  this.canvaJuego.removeEventListener("mousedown", this.onMouseDown);
  this.canvaJuego.removeEventListener("mousemove", this.arrastrarFicha);
  window.removeEventListener("mouseup", this.onMouseUp);

  this.ctx.clearRect(0, 0, this.canvaJuego.width, this.canvaJuego.height);

  this.inicializar();
}

// resetGame() {
//   const formLines = document.getElementById("formLineas");
//   const fondoJuego = document.getElementById("fondoJuego");

//   // Oculta el fondo del juego y muestra el formulario
//   fondoJuego.classList.add('taparJuego');
//   formLines.classList.remove('taparJuego');

//   // Reinicia el estado del juego
//   this.fichas = [];
//   this.turnoActivo = 'equipo1';
//   this.tablero.reiniciarTablero(); // Llama a un método para limpiar el tablero (debes implementarlo si no existe)
  
//   // Inicializa el juego nuevamente
//   this.inicializar();
// }


  soltarFicha() {
    if (this.fichaSeleccionada) {
      console.log("Ficha soltada");
      this.fichaSeleccionada = null;
    }
  }

  iniciarTemporizador(segundos) {
    // Cancelar cualquier temporizador activo
    if (this.temporizadorID) {
      clearTimeout(this.temporizadorID);
      this.temporizadorID = null;
    }
  
    // Mostrar temporizador
    if (!reset && segundos >= 0) {
      this.temporizadorID = setTimeout(() => {
        this.iniciarTemporizador(segundos - 1);
        spanTemporizador.innerHTML = `${segundos} segs.`;
      }, 1000);
    } else {
      divTemporizador.classList.add("display-none");
      spanTemporizador.innerHTML = "";
    }
  }
  
/*

  dibujarFondo() {
    this.ctx.fillStyle = '#e6e6fa'; // Color de fondo suave
    this.ctx.fillRect(0, 0, this.canvaJuego.width, this.canvaJuego.height);
}

// Dibujar el cartel en el canvas
mostrarCartel(mensaje) {
  
  const x = this.canvaJuego.width / 2;
  const y = this.canvaJuego.height / 2;
    const ancho = 300;
    const alto = 100;
    
    this.ctx.fillStyle = 'rgba(138, 43, 226, 0.8)';
    this.ctx.fillRect(x - ancho / 2, y - alto / 2, ancho, alto);
    
    this.ctx.font = '24px Arial';
    this.ctx.fillStyle = '#f0a500';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(mensaje, x, y);
    console.log("no figuro");
  }*/
  
}
