'use strict';
import Tablero from './Tablero.js';
import Ficha from './Ficha.js';

document.addEventListener('DOMContentLoaded', () => {

    let canvas = document.querySelector("#canvas");
    /** @type {CanvasRenderingContext2D} */
    // let ctx = canvas.getContext("2d");
    // let canvasWidth = canvas.offsetWidth;
    // let canvasHeight = canvas.offsetHeight;

    let jugadorUno;
    let jugadorDos;
    let jugadorActual;

    let nombreJugadorUno;
    let nombreJugadorDos;
    let imagenJugadorUno;
    let imagenJugadorDos;
    let tipoJuego;
    let jugando = false;
    let terminado = false;
    let error = false;


    let divTiempo = document.querySelector(".contenedor_temp");
    let spanTiempo = document.querySelector("#juego_temporizador");

    let cantFichas;


    let imgFichaJugadorUno=new Image();
    let imgFichaJugadorDos=new Image();
    imgFichaJugadorUno.src = '../img'; //imagen de joker y otra de batman

    let mouseDown=false;
});

export default class Juego {
    constructor(line) {
        console.log(`Juego creado con ${line + 2} filas y ${line + 3} columnas`);
        this.tablero = new Tablero(4);
        this.j1 = new Ficha("X");
        this.j2 = new Ficha("O");
        this.turn = this.j1;
        this.fichaSeleccionada=null;
        this.offsetX = 0;
        this.offsetY = 0;


        this.fichas = [];
        this.canvaJuego = document.getElementById('canvaJuego');
        this.ctx = this.canvaJuego.getContext('2d');
        this.inicializar();

        this.canvaJuego.addEventListener("click", (event) => this.detectarClick(event));
        this.canvaJuego.addEventListener("mousedown", (event) => this.iniciarDrag(event));
        this.canvaJuego.addEventListener("mousemove", (event) => this.arrastrarFicha(event));
        this.canvaJuego.addEventListener("mouseup", () => this.soltarFicha());
    }

    inicializar() {
        const botonJugar = document.getElementById('btnJugar');
        if (botonJugar) {
            botonJugar.addEventListener('click', () => this.initGame());
        } else {
            console.log('error en boton jugar');
        }
    }

    initGame() {
        console.log('iniciando juego...');
        this.tablero = new Tablero(4);
        const fichaJ1 = new Ficha('red');
        this.fichas.push(fichaJ1);
        this.cambiarPantallas();
        this.tablero.dibujarTablero(this.ctx);
        this.dibujarFichas();
    }

    cambiarPantallas() {
        const fondoJuego = document.getElementById('fondoJuego');
        const portadaJuego = document.getElementById('gamePortada');

        portadaJuego.classList.remove('mostrarJuego');
        portadaJuego.classList.add('taparJuego');

        fondoJuego.classList.remove('taparJuego');
        fondoJuego.classList.add('mostrarJuego');
    }

    dibujarFichas() {
        this.fichas.forEach(ficha => ficha.dibujarFicha(this.ctx));
    }

    detectarClick(event) {
        const rect = this.canvaJuego.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        console.log(`Coordenadas del clic: x=${x}, y=${y}`);
        console.log(`Centro de la ficha: x=${this.posX}, y=${this.posY}`);


        this.fichas.forEach(ficha => {
            if (ficha.esClickeada(x, y)) {
                console.log("ficha clickeada");
            } else {
                console.log('no está en la ficha');
            }
        });
    }

    iniciarDrag(event) {
        const rect = this.canvaJuego.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
    
        this.fichas.forEach(ficha => {
            if (ficha.esClickeada(x, y)) {
                this.fichaSeleccionada = ficha;
                this.offsetX = x - ficha.posX;  
                this.offsetY = y - ficha.posY;
                console.log("Ficha seleccionada para arrastrar");
            }
        });
    }

    arrastrarFicha(event) {
        if (this.fichaSeleccionada) {
            const rect = this.canvaJuego.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            this.fichaSeleccionada.posX = x - this.offsetX;
            this.fichaSeleccionada.posY = y - this.offsetY;

            this.ctx.clearRect(0, 0, this.canvaJuego.width, this.canvaJuego.height);
            this.tablero.dibujarTablero(this.ctx);
            this.dibujarFichas();
        }
    }

    soltarFicha() {
        if (this.fichaSeleccionada) {
            console.log("Ficha soltada");
            this.fichaSeleccionada = null;
        }
    }
}
//export default Juego;

/**
         * isMouseDown=false
         * isMouseUp=false
         * onMouseMove
         */