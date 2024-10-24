'use strict';
import Casillero from './Casillero.js';
import Ficha from './Ficha.js';

export default class Tablero {
    casilleros = [];
    constructor(line){
      if (typeof line !== 'number' || line <= 0) {
        throw new Error('line debe ser un número entero positivo');
      }
        this.line = line;
        this.rows = line + 2;
        this.columns = line + 3;
        this.initTablero();
    }

    //----- CREAR TABLERO---------------
    initTablero(){ //es lo mismo que dibujarse
        for(let i=0; i<this.rows; i++){ //expando cantidad de casilleros X cantFilas
          this.casilleros[i] = [];
            for(let j=0; j<this.columns; j++){
              this.casilleros[i][j] = new Casillero(i, j); //creo un casillero con numero de fila y columna
            }
        }
    }

    //IMPRIMIR TABLERO EN CONSOLA
    imprimirTablero() {
      let output = '';

      for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
              const casillero = this.casilleros[i][j];
              const ficha = casillero.getFicha();

              output += ficha ? ficha.getEquipo() : '.'; 
              output += ' '; 
          }
          output += '\n'; 
      }

    console.log(output); 
    }

    reiniciarTablero() {
      this.casilleros = [];
      this.initTablero();
    }

    /**
     * isFichaDropZone(ficha){}
     */

    /**
     * metodos de dibujos de tablero -->
     */
//-----------VERIFICAR GANADOR-----------
    verifyWinner(posX, posY) {
      return (
        this.verifyHorizontal(posX, posY) ||
          this.verifyVertical(posX, posY) /*|| 
          this.verifyDiagonalDescendente(posX, posY) || 
          this.verifyDiagonalAscendente(posX, posY)*/
      );
  }

//HORIZONTAL
    verifyHorizontal(posX, posY) {
      if (this.casilleros[posX][posY].getFicha() !== null) {
        return this.checkHorizontal(posX, posY, 1) || this.checkHorizontal(posX, posY, -1);
      }
      return false;
    }

    verifyVertical(posX, posY) {
      if (this.casilleros[posX][posY].getFicha() !== null) {
        return this.checkVertical(posX, posY, 1) || this.checkVertical(posX, posY, -1);
      }
      return false;
    }

    verifyDiagonalDescendente(posX, posY) {
      if (this.casilleros[posX][posY].getFicha() !== null) {
        return this.checkVertical(posX, posY, 1) || this.checkVertical(posX, posY, -1);
      }
      return false;
    }
  
  verifyDiagonalAscendente(posX, posY) {
      for (let i = 3; i < this.rows; i++) {  // Recorre filas, empezando desde la cuarta
          for (let j = 0; j < this.columns - 3; j++) {  // Recorre columnas
              const ficha = this.obtenerCasillero(i, j).obtenerFicha();
              if (ficha && this.checkDiagonalAscendente(i, j)) {
                  console.log(`Ganador: ${ficha.color}`);
                  return true;
              }
          }
      }
    return false;
  }

  checkHorizontal(posX, posY, desplazamiento){
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

  checkVertical(posX, posY, desplazamiento) {
    let cont=1;
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

    for(let j=posX-1; j >= 0; j--){
      const fichaArriba = this.casilleros[j][posY].getFicha();
      if(fichaArriba && fichaArriba.getEquipo() === equipo){
        cont++;
      } else {
        break;
      }
    }return cont === this.line;
  }

  checkDiagonalDescendente(row, column) {
    return (
        this.obtenerCasillero(row, column).obtenerFicha().color ===
        this.obtenerCasillero(row + 1, column + 1).obtenerFicha().color &&
        this.obtenerCasillero(row, column).obtenerFicha().color ===
        this.obtenerCasillero(row + 2, column + 2).obtenerFicha().color &&
        this.obtenerCasillero(row, column).obtenerFicha().color ===
        this.obtenerCasillero(row + 3, column + 3).obtenerFicha().color
    );
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

    getCasillero(row, column){
        return this.casilleros[row][column];
    }

    // //------COLOCAR FICHA------
    /*
    colocarFicha(ficha, posX, posY){
      if (posX < 0 || posX >= this.rows || posY < 0 || posY >= this.columns) {
        throw new Error('Posición fuera de los límites del tablero');
    }
    if (this.casilleros[posX][posY].estaVacio()) {
        this.casilleros[posX][posY].colocarFicha(ficha); 
        this.imprimirTablero();

        if(this.verifyWinner(posX, posY)){
          console.log("hay ganador");
        }
      } else {
          return false; 
      }
    }*/

    colocarFicha(ficha, posY){
      if (posY < 0 || posY >= this.columns) {
        throw new Error('Posición fuera de los límites del tablero');
      }
      if (this.casilleros[0][posY].estaVacio()) { //checkeo que la columna no rebalse
        let ultimaFila = this.rows - 1;  

        while (ultimaFila > 0 && !this.casilleros[ultimaFila][posY].estaVacio()) {
          ultimaFila--;  // subo una fila hacia arriba
        }

        if(this.casilleros[ultimaFila][posY].estaVacio()){
          this.casilleros[ultimaFila][posY].colocarFicha(ficha); 
          this.imprimirTablero();

          if(this.verifyWinner(ultimaFila, posY)){
            console.log("hay ganador");
          }
        } else {
            return false; 
        }
      } else{
        throw new Error('Columna llena');
      }
    }

    obtenerCasillero(posX, posY){
      return this.casilleros[posX][posY];
    }
  }
  
//export default Tablero;
