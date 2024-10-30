'use strict';
export default class Casillero {
    constructor(numRow, numColumn) {
        if (typeof numRow !== 'number' || numRow < 0) {
            throw new Error('numRow debe ser un número positivo');
        }
        if (typeof numColumn !== 'number' || numColumn < 0) {
            throw new Error('numColumn debe ser un número positivo');
        }
        // const cellWidth=canvasWidth/this.numColumn;
        // const cellHeight=canvasHeight/this.numRow;
        // const radius=Math.min(cellWidth,cellHeight)*0.4;
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
        if(rows===0){
            ctx.beginPath();
            ctx.arc(colums*60+50,rows*60+50,25,0,2*Math.PI);
            ctx.fillStyle='transparent';
            ctx.fill();
            ctx.stroke();
        } else {
        ctx.beginPath();
            ctx.arc(colums*60+50,rows*60+50,25,0,2*Math.PI);
            ctx.fillStyle='green';
            ctx.fill();
            ctx.stroke();
        }
        // if(this.ficha){
        //     this.ficha.dibujar(ctx,rows,colums);
        // }
    }

    soyCasilleroDrop(){
        return this.numRow===0;
    }

}
