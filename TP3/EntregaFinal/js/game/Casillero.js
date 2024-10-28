'use strict';
export default class Casillero {
    constructor(numRow, numColumn) {
        if (typeof numRow !== 'number' || numRow < 0) {
            throw new Error('numRow debe ser un número positivo');
        }
        if (typeof numColumn !== 'number' || numColumn < 0) {
            throw new Error('numColumn debe ser un número positivo');
        }
        this.numRow = numRow;
        this.numColumn = numColumn;
        this.ficha = null; 
    }

    eliminarFicha() {
        this.ficha = null;
    }

    colocarFicha(ficha){
        this.ficha = ficha;
      }

    getFicha() {
        return this.ficha; 
    }

    estaVacio() {
        return this.ficha === null;
    }

    getCasillero(){
        return this;
    }

    dibujar(ctx,rows,colums){
        ctx.beginPath();
        ctx.arc(colums*100+50,rows*100+50,40,0,2*Math.PI);
        ctx.stroke();

        if(this.ficha){
            this.ficha.dibujar(ctx,rows,colums);
        }
    }

}
