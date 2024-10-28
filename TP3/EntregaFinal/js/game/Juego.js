'use strict';
import Tablero from './Tablero.js';
import Ficha from './Ficha.js';

document.addEventListener('DOMContentLoaded', () => {

    let canvas = document.querySelector("#canvas");
    /** @type {CanvasRenderingContext2D} */
    let ctx = canvas.getContext("2d");
    let canvasWidth = canvas.offsetWidth;
    let canvasHeight = canvas.offsetHeight;

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
    let radio=25;
    let fichasArray=[];
    let originalX;
    let originalY;
    let imgFichaJugadorUno=new Image();
    let imgFichaJugadorDos=new Image();
    imgFichaJugadorUno.src = '../img'; //imagen de joker y otra de batman

    let mouseDown=false;
    let fichaOnClick=null;
    let coor


});

export default class Juego {
    constructor(line){
        console.log(`Juego creado con ${line + 2} filas y ${line + 3} columnas`);
        this.tablero = new Tablero(line);   
        this.j1 = new Ficha("X");
        this.j2 = new Ficha("O");
        this.turn = this.j1;
        this.fichas=[];
        this.canvaJuego=document.getElementById('canvaJuego');
        this.ctx=this.canvaJuego.getContext('2d');
        this.inicializar();
           
    }




    inicializar(){
        const botonJugar = document.getElementById('btnJugar');
        if (botonJugar) {
            botonJugar.addEventListener('click', () => this.initGame());
        }else{
            console.log('error en boton jugar');
        }
    }


    initGame(){
        console.log('iniciando juego...');
        this.tablero=new Tablero(4);
        const fichaJ1=new Ficha('j1',30,'red',50,this.canvaJuego.height/2);
        const fichaJ2 = new Ficha('jugador2', 30, 'yellow', this.canvaJuego.width - 50, this.canvaJuego.height / 2);
        this.fichas.push(fichaJ1,fichaJ2);
        this.cambiarPantallas();
        this.dibujarFichas()
        this.tablero.imprimirTablero();
        this.tablero.dibujarTablero();
    }

    cambiarPantallas(){
        const fondoJuego=document.getElementById('fondoJuego');
        const portadaJuego=document.getElementById('gamePortada');

        portadaJuego.classList.remove('mostrarJuego');
        portadaJuego.classList.add('taparJuego');
        
        fondoJuego.classList.remove('taparJuego');
        fondoJuego.classList.add('mostrarJuego');;
    }

    dibujarFichas(){
        this.fichas.forEach(Ficha=>Ficha.dibujarFicha(this.ctx));
    }

    changeTurn(){
        if(this.turn == this.j1) {
            this.turn = this.j2;
        } else if(this.turn == this.j2){
            this.turn = this.j1;
        } else
            console.log("No hay turno asignado");
    }

    getEquipoJ1(){        
        return this.j1.getEquipo();
    }

    getEquipoJ2(){
        return this.j2.getEquipo();
    }
}
//export default Juego;

/**
         * isMouseDown=false
         * isMouseUp=false
         * onMouseMove
         */