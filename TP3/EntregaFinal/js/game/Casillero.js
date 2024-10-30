'use strict';

export default class Casillero {
    imagen;
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
    this.imagen = new Image();  
    this.imagen.src = '../img/icono/casillero.svg';
}

  eliminarFicha() {
    this.ficha = null;
  }

  colocarFicha(ficha) {
    this.ficha = ficha;
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

  dibujar(ctx, rows, colums) {
    ctx.beginPath();
    ctx.arc(colums * 60 + 50, rows * 60 + 50, 25, 0, 2 * Math.PI);
    ctx.fillStyle = rows === 0 ? 'transparent' : 'green';
    ctx.fill();
    ctx.stroke();

    // Dibujar imagen fuera del círculo
    if (this.imagen) {
      ctx.drawImage(this.imagen, colums * 60 + 50 - 30, rows * 60 + 50 - 30, 61, 63);
    }
  }

  soyCasilleroDrop() {
    return this.numRow === 0;
  }
}