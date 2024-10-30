'use strict';
import Tablero from './Tablero.js';
import Ficha from './Ficha.js';

let divTemporizador = document.querySelector(".contenedor-temporizador");
let spanTemporizador = document.querySelector("#juego-temporizador");
let firstTime = true;
let reset = false;

document.addEventListener('DOMContentLoaded', () => {

    let canvas = document.querySelector("#canvas");
    /** @type {CanvasRenderingContext2D} */
    // let ctx = canvas.getContext("2d");
    // let canvasWidth = canvas.offsetWidth;
    // let canvasHeight = canvas.offsetHeight;
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
        this.isMouseDown=false;


        this.fichas = [];
        this.canvaJuego = document.getElementById('canvaJuego');
        this.ctx = this.canvaJuego.getContext('2d');
        this.inicializar();

        this.canvaJuego.addEventListener("mousedown", (event) => this.onMouseDown(event));
        // this.canvaJuego.addEventListener("mousedown", (event) => this.iniciarDrag(event));
        this.canvaJuego.addEventListener("mousemove", (event) => this.arrastrarFicha(event));
        this.canvaJuego.addEventListener("mouseup", (event) => this.onMouseUp(event));
    }

    inicializar() {
        const botonJugar = document.getElementById('btnJugar');
        //const botonJugarForm = document.getElementById('btnJugar2');
        if (botonJugar) {
            botonJugar.addEventListener('click', () => this.initGame());
        } else {
            console.log('error en boton jugar');
        }
    }

    initGame() {
        console.log('iniciando juego...');
        //this.mostrarForm();
        this.tablero = new Tablero(4);
        const fichaJ1 = new Ficha('red');
        this.fichas.push(fichaJ1);
        this.cambiarPantallas();
        this.tablero.dibujarTablero(this.ctx);
        this.dibujarFichas();
        this.iniciarTemporizador(302);
    }

    cambiarPantallas() {
        const fondoJuego = document.getElementById('fondoJuego');
        const portadaJuego = document.getElementById('gamePortada');
        const timer = document.getElementById('timer');
        

        portadaJuego.classList.remove('mostrarJuego');
        portadaJuego.classList.add('taparJuego');

        fondoJuego.classList.remove('taparJuego');
        fondoJuego.classList.add('mostrarJuego');
    }
   /* mostrarForm(){
      const form = document.getElementById('cartelForm');
      form.classList.remove("cartel");
      form.classList.add("cartel2");
    }*/

    dibujarFichas() {
        this.fichas.forEach(ficha => ficha.dibujarFicha(this.ctx));
    }

    // detectarClick(event) {
    //     const rect = this.canvaJuego.getBoundingClientRect();
    //     const x = event.clientX - rect.left;
    //     const y = event.clientY - rect.top;
    //     console.log(`Coordenadas del clic: x=${x}, y=${y}`);
    //     console.log(`Centro de la ficha: x=${this.posX}, y=${this.posY}`);


    //     this.fichas.forEach(ficha => {
    //         if (ficha.esClickeada(x, y)) {
    //             console.log("ficha clickeada");
    //         } else {
    //             console.log('no está en la ficha');
    //         }
    //     });
    // }

    onMouseDown(event){
        this.isMouseDown=true;
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
        if (this.isMouseDown && this.fichaSeleccionada) {
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


    onMouseUp(e){
        this.isMouseDown=false;
        if(this.fichaSeleccionada){
            if(this.tablero.isInZoneDrop(this.fichaSeleccionada)){//se fija si esta en la zona dropeable
                if(this.tablero.dropFicha(this.fichaSeleccionada)){//suelta en caso de q la columna tenga lugar
                    if(this.tablero.verifyWinner(this.fichaSeleccionada)){
                        //ejecuto metodo endGame;
                    }else{
                        //verificar q no se llenó el tablero, si se llenó ejecuto endGame; 
                        //sino cambiamos turno
                    }
                }else{
                    //vuelve la ficha a su posicion inicial
                }   
            }else{
                //vuelve la ficha a su posicion inicial juntar ifs
            }
        }
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
