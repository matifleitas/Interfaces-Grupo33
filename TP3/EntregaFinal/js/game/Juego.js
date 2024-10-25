'use strict';
import Tablero from './Tablero.js';
import Ficha from './Ficha.js';

export default class Juego {
    constructor(line){
        console.log(`Juego creado con ${line + 2} filas y ${line + 3} columnas`);
        this.tablero = new Tablero(line);
        this.j1 = new Ficha("X");
        this.j2 = new Ficha("O");
        this.turn = this.j1;
        let containerJuego=document.getElementById('canvaJuego');
        let tablero=new Tablero();
        this.initGame();
        /**
         * isMouseDown=false
         * isMouseUp=false
         * onMouseMove
         */
    }

    initGame(){
        this.tablero.imprimirTablero();
        this.tablero.imprimirTableroEnCanva();
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
