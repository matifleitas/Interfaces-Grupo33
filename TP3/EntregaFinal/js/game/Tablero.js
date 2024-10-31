"use strict";
import Casillero from "./Casillero.js";
import Ficha from "./Ficha.js";

export default class Tablero {
  casilleros = [];
  canvasJuego;
  tableroImg;
  rows;
  columns;
  casilleroImagen;

  //---------------------Constructor---------------------------

  constructor(line) {
    if (line <= 0) {
      throw new Error("line debe ser un número entero positivo el numero es: ");
    }
    this.line = line;
    this.rows = line + 2;
    this.columns = line + 3;
    this.anchoColumna = 60;
    const casilleroImagen = new Image();
    casilleroImagen.src = "../img/icono/marcoCasillero.png";
    this.tableroImg = new Image();
    this.tableroImg.src = "../assets/tablero.png";
    this.canvasJuego = document.getElementById("canvaJuego");
    const imgTablero = new Image();
    imgTablero.src = "../assets/tablero.png";
    this.initTablero();
  }

  //----- CREAR TABLERO---------------
  initTablero() {
    //es lo mismo que dibujarse
    for (let i = 0; i < this.rows; i++) {
      //expando cantidad de casilleros X cantFilas
      this.casilleros[i] = [];
      for (let j = 0; j < this.columns; j++) {
        this.casilleros[i][j] = new Casillero(i, j,this.anchoColumna); //creo un casillero con numero de fila y columna
        //this.casilleros[i][j].setImagen(this.casilleroImagen);
        //console.log(this.casilleros[i][j]);
      }
    }
  }

  //IMPRIMIR TABLERO EN CONSOLA
  imprimirTablero() {
    let output = "";

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const casillero = this.casilleros[i][j];
        const ficha = casillero.getFicha();

        output += ficha ? ficha.getEquipo() : ".";
        output += " ";
      }
      output += "\n";
    }
    console.log(output);
  }

  //Dibujar tablero

  dibujarTablero(ctx) {
    ctx.clearRect(0, 0, this.canvasJuego.width, this.canvasJuego.height);
    
    //calculo el desplazamiento para centrar el tablero
    const offsetX = (this.canvasJuego.width - this.columns * this.anchoColumna) / 2;
    const offsetY = (this.canvasJuego.height - this.rows * this.anchoColumna) / 2;
    
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.casilleros[i][j].dibujar(ctx,offsetX + j * this.anchoColumna, offsetY + i * this.anchoColumna);
      }
    }

  }

  reiniciarTablero() {
    this.casilleros = [];
    this.initTablero();
  }

  //-----------VERIFICAR GANADOR-----------
  verifyWinner(fichaGanadora) {
    const posX = fichaGanadora.getPosX();
    const posY = fichaGanadora.getPosY();
    console.log(`entreee a verificar ganador`);
    //console.log(this.casilleros[fichaGanadora.getPosX()][fichaGanadora.getPosY()]);
    console.log(`getPosX(): ${fichaGanadora.getPosX()}`);
    console.log(`getPosY(): ${fichaGanadora.getPosY()}`);
    return (
      this.verifyHorizontal(posX, posY) ||
      this.verifyVertical(posX, posY) ||
      this.verifyDiagonalDescendente(posX, posY) //||
      //this.verifyDiagonalAscendente(posX, posY)
    );
  }

  //HORIZONTAL
  verifyHorizontal(posX, posY) {
    console.log(posX, posY);

    if (this.casilleros[posX][posY].getFicha() !== null) {
      return (
        this.checkHorizontal(posX, posY, 1) ||
        this.checkHorizontal(posX, posY, -1)
      );
    }
    return false;
  }

  verifyVertical(posX, posY) {
    if (this.casilleros[posX][posY].getFicha() !== null) {
      return (
        this.checkVertical(posX, posY, 1) || this.checkVertical(posX, posY, -1)
      );
    }
    return false;
  }

  verifyDiagonalDescendente(posX, posY) {
    if (this.casilleros[posX][posY].getFicha() !== null) {
      return (
        this.checkDiagonalDescendente(posX, posY, 1) ||
        this.checkDiagonalDescendente(posX, posY, -1)
      );
    }
    return false;
  }

  verifyDiagonalAscendente(posX, posY) {
    for (let i = 3; i < this.rows; i++) {
      // Recorre filas, empezando desde la cuarta
      for (let j = 0; j < this.columns - 3; j++) {
        // Recorre columnas
        const ficha = this.obtenerCasillero(i, j).obtenerFicha();
        if (ficha && this.checkDiagonalAscendente(i, j)) {
          console.log(`Ganador: ${ficha.color}`);
          return true;
        }
      }
    }
    return false;
  }

  checkHorizontal(posX, posY) {
    //console.log("entro");
    let cont = 1;
    let casilleroActual = this.casilleros[posX][posY];

    if (casilleroActual.getFicha() === null) {
      return false;
    }

    const equipo = casilleroActual.getFicha().getEquipo();

    for (let i = posY + 1; i < this.columns; i++) {
      const fichaDerecha = this.casilleros[posX][i].getFicha();

      if (fichaDerecha && fichaDerecha.getEquipo() === equipo) {
        cont++;
      } else {
        break;
      }
    }

    for (let j = posY - 1; j >= 0; j--) {
      const fichaIzquierda = this.casilleros[posX][j].getFicha();
      if (fichaIzquierda && fichaIzquierda.getEquipo() === equipo) {
        cont++;
      } else {
        break;
      }
    }
    return cont === this.line;
  }

  checkVertical(posX, posY) {
    let cont = 1;
    let casilleroActual = this.casilleros[posX][posY];

    if (casilleroActual.getFicha() === null) {
      return false;
    }
    const equipo = casilleroActual.getFicha().getEquipo();

    for (let i = posX + 1; i < this.rows; i++) {
      const fichaAbajo = this.casilleros[i][posY].getFicha();

      if (fichaAbajo && fichaAbajo.getEquipo() === equipo) {
        cont++;
      } else {
        break;
      }
    }

    for (let j = posX - 1; j >= 0; j--) {
      const fichaArriba = this.casilleros[j][posY].getFicha();
      if (fichaArriba && fichaArriba.getEquipo() === equipo) {
        cont++;
      } else {
        break;
      }
    }
    return cont === this.line;
  }

  checkDiagonalDescendente(posX, posY) {
    let cont = 1;
    let casilleroActual = this.casilleros[posX][posY];

    if (casilleroActual.getFicha() === null) {
      return false;
    }
    const equipo = casilleroActual.getFicha().getEquipo();

    for (
      let i = posX + 1, j = posY + 1;
      i < this.rows && j < this.columns;
      i++, j++
    ) {
      const fichaAbajoDerecha = this.casilleros[i][j].getFicha();

      if (fichaAbajoDerecha && fichaAbajoDerecha.getEquipo() === equipo) {
        cont++;
      } else {
        break;
      }
    }

    for (let i = posX + 1, j = posY - 1; i < this.rows && j >= 0; i++, j--) {
      const fichaAbajoIzquierda = this.casilleros[i][j].getFicha();
      if (fichaAbajoIzquierda && fichaAbajoIzquierda.getEquipo() === equipo) {
        cont++;
      } else {
        break;
      }
    }
    return cont === this.line;
  }

  checkDiagonalAscendente(row, column) {
    return (
      this.obtenerCasillero(row, column).obtenerFicha().color ===
        this.obtenerCasillero(row - 1, column + 1).obtenerFicha().color &&
      this.obtenerCasillero(row, column).obtenerFicha().color ===
        this.obtenerCasillero(row - 2, column + 2).obtenerFicha().color &&
      this.obtenerCasillero(row, column).obtenerFicha().color ===
        this.obtenerCasillero(row - 3, column + 3).obtenerFicha().color
    );
  }

  getCasillero(row, column) {
    return this.casilleros[row][column];
  }

  // //------COLOCAR FICHA------

  // colocarFicha(ficha, columna) {
  //   if (columna < 0 || columna >= this.columns) {
  //     throw new Error("Posición fuera de los límites del tablero");
  //   }

  //   const fila = this.ultimaFilaDisponible(columna);
  //   console.log("ultima fila disponible: " + fila);
  //   if (fila !== -1) {
  //     this.casilleros[fila][columna].colocarFicha(ficha);
  //     this.imprimirTablero();
  //     if (this.verifyWinner(ficha)) {
  //       console.log("Hay ganador");
  //     }
  //   } else {
  //     throw new Error("Columna llena");
  //   }
  // }

  obtenerCasillero(posX, posY) {
    return this.casilleros[posX][posY];
  }

  isFull() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const casillero = this.casilleros[i][j];
        if (casillero.estaVacio()) {
          return false;
        }
      }
    }
    return true;
  }

  dropFicha(ficha) {
    console.log("en drop ficha");

    const columna = Math.floor(ficha.getPosX() / this.anchoColumna); // dividir entre el ancho de la columna
    const fila = this.ultimaFilaDisponible(columna); // oobtener la fila disponible

    console.log("ultima fila disponible: " + fila);

    //console.log(fila);
    //console.log('get posX: '+ ficha.getPosX());

    if (this.isInZoneDrop(ficha)) {
      let fila=this.isColumnFull(columna);
      if(fila){
        this.casilleros[columna][fila].colocarFicha(ficha); // ctualizar casillero
      }

      //this.casilleros[5][5].dibujar(ctx,this.rows,this.columns);

      //ficha.setPosicion(columna * this.anchoColumna, y);
      return true;
    }
    return false;
  }

  isInZoneDrop(fichaSeleccionada, ctx) {
    const zonaX = ((this.canvasJuego.width - this.columns * this.anchoColumna) / 2) - 25;
    const zonaY = ((this.canvasJuego.height - this.rows * this.anchoColumna) / 2) - 65;
    const zonaAncho = (this.canvasJuego.width / 2)-63; // ancho de la zona dropeable
    const zonaAlto = 50; // alto de la zona dropeable

    if (
      fichaSeleccionada.getPosX() >= zonaX &&
      fichaSeleccionada.getPosX() <= zonaX + zonaAncho &&
      fichaSeleccionada.getPosY() >= zonaY &&
      fichaSeleccionada.getPosY() <= zonaY + zonaAlto
    ) {
      console.log("en zona dropeable");
      return true;
    } else {
      fichaSeleccionada.resetPosicion();
      this.dibujarTablero(ctx);
      fichaSeleccionada.dibujarFicha(ctx);
      return false;
    }
  }

  ultimaFilaDisponible(columna) {
    console.log(`Columna: ${columna}`);

    if (columna < 0 || columna >= this.columns) {
      console.log("Posición fuera de los límites del tablero");
    }

    for (let i = this.rows - 1; i >= 0; i--) {
      if (
        this.casilleros[i] &&
        this.casilleros[i][columna] &&
        this.casilleros[i][columna].estaVacio()
      ) {
        return i;
      }
    }

    console.log(`Columna llena`);
    return -1; // columna llena
  }
}

//export default Tablero;
