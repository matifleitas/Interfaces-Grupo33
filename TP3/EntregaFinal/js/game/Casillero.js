'use strict';
export default class Casillero{
    constructor(numRow, numColumn){
        this.numRow = numRow;
        this.numColumn = numColumn;
        this.ficha = null;
    }

    colocarFicha(ficha){
        this.ficha = ficha;
    }

    obtenerFicha() {
        return this.ficha;
      }

    getFicha(){
        return this.ficha;
    }

    getNumRow(){
        return this.numRow;
    }

    getNumColumn(){
        return this.numColumn;
    }

    estaVacio(){
        return this.ficha == null;
    }
}

//export default Casillero;
