'use strict';

export default class Casillero {
    imagen;
  constructor(numRow, numColumn,ancho) {
    if (typeof numRow !== 'number' || numRow < 0) {
      throw new Error('numRow debe ser un número positivo');
    }
    if (typeof numColumn !== 'number' || numColumn < 0) {
      throw new Error('numColumn debe ser un número positivo');
    }

    this.ancho=ancho;

    this.posX=numColumn*ancho;
    this.posY=numRow*ancho;
    this.numRow = numRow;
    this.numColumn = numColumn;
    this.ficha = null;
    this.imagen = new Image();  
    this.imagen.src = '../img/icono/marcoCasillero.png';
}

  eliminarFicha() {
    this.ficha = null;
  }

  colocarFicha(ficha) {
    this.ficha = ficha;
    this.ficha.setPosicion(this.posX+this.ancho/2,this.posY+this.ancho/2);
  }

  getFicha() {
    if (this.ficha) {
      return this.ficha;
    } else {
      return null;
    }
  }

  

  estaVacio() {
    return this.ficha === null;
  }

  getCasillero() {
    return this;
  }

  setImagen(imagen) { // Método para establecer la imagen
    this.imagen = imagen;
  }

  dibujar(ctx, posX, posY) {
    ctx.beginPath();
    // Dibujar imagen fuera del círculo
    if (this.imagen) {
      ctx.drawImage(this.imagen,posX,posY, 60, 61);
      if(this.ficha!=null){
        this.ficha.dibujarFicha(ctx);
      }
    }
  }

  soyCasilleroDrop() {
    return this.numRow === 0;
  }
}