"use strict";
import Tablero from "./Tablero.js";
import Ficha from "./Ficha.js";

let divTemporizador = document.querySelector(".contenedor-temporizador");
let spanTemporizador = document.querySelector("#juego-temporizador");
let firstTime = true;
let reset = false;
let lineasAJugar;

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.querySelector("#canvas");
  /** @type {CanvasRenderingContext2D} */
  let cantFichas;

  let imgFichaJugadorUno = new Image();
  let imgFichaJugadorDos = new Image();
  imgFichaJugadorUno.src = "../img"; //imagen de joker y otra de batman
  let mouseDown = false;
});

export default class Juego {
  constructor(line) {
    console.log(`Juego creado con ${line + 2} filas y ${line + 3} columnas`);
    this.tablero = new Tablero(line);
    this.j1 = new Ficha("X");
    this.j2 = new Ficha("O");
    this.turn = this.j1;
    this.fichaSeleccionada = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.isMouseDown = false;
    this.lineasAJugar;

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
      this.fichaSeleccionada.dibujarFicha();
    }
    requestAnimationFrame(() => this.drawFrame());
  }

  initGame() {
    console.log("iniciando juego...");
    this.cambiarPantallas();
    requestAnimationFrame(() => this.drawFrame());
    this.crearFichas();
    this.iniciarTemporizador(302);
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
    const posXBase = 910;
    const posYBase = 400;
    const separacion = 9; // Espacio entre fichas para el efecto de apilamiento

    for (let i = 0; i < 20; i++) {
      let posX = posXBase + 1 * separacion; // Varía un poco `posX` aleatoriamente
      let posY = posYBase + i * separacion * -2; // Incrementa `posY` para apilar
      const ficha = new Ficha(posX, posY, "equipo1");
      this.fichas.push(ficha);
    }
  }

  dibujarFichas() {
    this.fichas.forEach((ficha) => ficha.dibujarFicha(this.ctx));
  }

  cambiarTurno() {
    this.turn = this.turn === this.j1 ? this.j2 : this.j1;
    console.log(`Turno del jugador: ${this.turn.getEquipo()}`);
  }

  onMouseDown(event) {
    this.isMouseDown = true;
    const rect = this.canvaJuego.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.fichas.forEach((ficha) => {
      if (ficha.esClickeada(x, y)) {
        this.fichaSeleccionada = ficha;
        this.offsetX = x - ficha.posX;
        this.offsetY = y - ficha.posY;
        console.log("Ficha seleccionada para arrastrar");
      }
    });
  }

  arrastrarFicha(event) {
    if (this.isMouseDown && this.fichaSeleccionada) {
      const rect = this.canvaJuego.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      this.fichaSeleccionada.posX = x - this.offsetX;
      this.fichaSeleccionada.posY = y - this.offsetY;

      this.drawFrame();
    }
  }

  onMouseUp(event) {
    this.isMouseDown = false;

    if (this.fichaSeleccionada) {
      const rect = this.canvaJuego.getBoundingClientRect();
      const x = event.clientX - rect.left; //  X relativa al canvas
      const y = event.clientY - rect.top; // Y relativa al canvas

      console.log(`Ficha soltada en: x=${x}, y=${y}`);
      console.log(this.fichaSeleccionada);

      if (this.tablero.isInZoneDrop(this.fichaSeleccionada, this.ctx)) {
        // coloca la ficha en la columna correspondiente
        if (this.tablero.dropFicha(this.fichaSeleccionada)) {
          console.log("entraste y no dibujaste");
          if (this.tablero.verifyWinner(this.fichaSeleccionada)) {
            console.log("ganaste");
            this.endGame();
          } else if (this.tablero.isFull()) {
            this.endGame(); // empate
          } else {
            this.cambiarTurno();
          }
        }
      } else {
        console.log("Ficha fuera de zona válida, regresando...");
      }
      this.fichaSeleccionada = null;
    }
    this.drawFrame();
  }

  endGame() {
    console.log("termino...");
  }

  soltarFicha() {
    if (this.fichaSeleccionada) {
      console.log("Ficha soltada");
      this.fichaSeleccionada = null;
    }
  }

  iniciarTemporizador(segundos) {
    if (reset) {
      divTemporizador.classList.add("display-none");
      spanTemporizador.innerHTML = "";
    } else if (segundos >= 0) {
      setTimeout(() => {
        this.iniciarTemporizador(segundos - 1);
        spanTemporizador.innerHTML = `${segundos} segs.`;
        //console.log(spanTemporizador.innerHTML);
      }, 1000);
    } else {
      finalizarJuegoPorTiempo();
    }
  }
}
