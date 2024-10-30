'use strict';
import Casillero from './Casillero.js';
import Ficha from './Ficha.js';

export default class Tablero {
    casilleros = [];
    canvasJuego;
    tableroImg;
    rows;
    columns;

    //---------------------Constructor---------------------------

    constructor(line){
      if (typeof line !== 'number' || line <= 0) {
        throw new Error('line debe ser un número entero positivo');
      }
        this.line = line;
        this.rows = line + 3;
        this.columns = line + 3;
        this.anchoColumna = 59;
        this.tableroImg= new Image();
        this.tableroImg.src='../assets/tablero.png';
        this.canvasJuego=document.getElementById('canvaJuego');
        const imgTablero=new Image();
        imgTablero.src='../assets/tablero.png';
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


    //Dibujar tablero

    dibujarTablero(ctx){
      ctx.clearRect(0,0,this.canvasJuego.width,this.canvasJuego.height);  
      for(let i=0;i<this.rows;i++){
        for(let j=0;j<this.columns;j++){
          this.casilleros[i][j].dibujar(ctx,i,j); 
        }
      }
    }

    reiniciarTablero() {
      this.casilleros = [];
      this.initTablero();
    }

    //metodos de manejo de fichas
    isInZoneDrop(ficha){
      
    }

//-----------VERIFICAR GANADOR-----------
    verifyWinner(fichaGanadora) {
      const posX = fichaGanadora.getPosX();
      const posY = fichaGanadora.getPosY();
      console.log(`fichaGanadora: ${JSON.stringify(fichaGanadora)}`);
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
        return this.checkDiagonalDescendente(posX, posY, 1) || this.checkDiagonalDescendente(posX, posY, -1);
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

  checkHorizontal(posX, posY){
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

  checkDiagonalDescendente(posX, posY) {
    let cont=1;
    let casilleroActual = this.casilleros[posX][posY];

    if (casilleroActual.getFicha() === null) {
      return false; 
    }
    const equipo = casilleroActual.getFicha().getEquipo();

    for (let i = posX + 1, j = posY + 1; i < this.rows && j < this.columns; i++, j++) {
      
        const fichaAbajoDerecha = this.casilleros[i][j].getFicha();

        if (fichaAbajoDerecha && fichaAbajoDerecha.getEquipo() === equipo){
          cont++;
        } else {
          break;        
        }
    }
    
    for(let i = posX + 1, j = posY - 1; i < this.rows && j >= 0;i++, j--){
      const fichaAbajoIzquierda = this.casilleros[i][j].getFicha();
      if(fichaAbajoIzquierda && fichaAbajoIzquierda.getEquipo() === equipo){
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

    getCasillero(row, column){
        return this.casilleros[row][column];
    }

    // //------COLOCAR FICHA------

    colocarFicha(ficha, columna) {
      if (columna < 0 || columna >= this.columns) {
        throw new Error('Posición fuera de los límites del tablero');
      }
      
      const fila = this.ultimaFilaDisponible(columna);
      if (fila !== -1) {
        this.casilleros[fila][columna].colocarFicha(ficha);
        this.imprimirTablero();
        if (this.verifyWinner(ficha)) {
          console.log("Hay ganador");
        }
      } else {
        throw new Error('Columna llena');
      }
    }

    obtenerCasillero(posX, posY){
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

    isInZoneDrop(x, y) {
        const columnaAncho = this.canvasJuego.width / this.columns; 
        const columna = Math.floor(x / columnaAncho); 
    
        const tableroFinY = this.canvasJuego.height;
        if (y >= 0 && y <= tableroFinY) {
            //console.log(`Ficha en la columna ${columna}`);  // Confirmación por consola
            return true;
        } else {
            return false;
        }
    }
  

    dropFicha(ficha, x, ctx) {
      const columna = Math.floor(x / this.anchoColumna); // dividir entre el ancho de la columna
      const fila = this.ultimaFilaDisponible(columna); // oobtener la fila disponible
      console.log(fila);
      if (fila !== -1) {
        ficha.setPosicion(columna * this.anchoColumna, fila * this.altoFila);
        this.casilleros[fila][columna].colocarFicha(ficha); // ctualizar casillero
        console.log(this.casilleros[fila][columna]);
        ficha.dibujarFicha(ctx);
        return true;
      }

      return false;
    }
  
    ultimaFilaDisponible(columna) {
      console.log(`Columna: ${columna}`);

      if (columna < 0 || columna >= this.columns) {
        console.log('Posición fuera de los límites del tablero');
      }
      
      for (let i = this.rows - 1; i >= 0; i--) {

        if (this.casilleros[i] && this.casilleros[i][columna] && this.casilleros[i][columna].estaVacio()) {

          return i;
        }
      }
      
      console.log(`Columna llena`);
      return -1; // columna llena
    }
  
  }
  
//export default Tablero;
