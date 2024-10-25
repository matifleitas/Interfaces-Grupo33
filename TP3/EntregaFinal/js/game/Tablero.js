'use strict';
import Casillero from './Casillero.js';
import Ficha from './Ficha.js';

export default class Tablero {
    casilleros = [];
    canvaJuego;
    tableroImg;
    rows;
    columns;

    //---------------------Constructor---------------------------

    constructor(line){
      if (typeof line !== 'number' || line <= 0) {
        throw new Error('line debe ser un número entero positivo');
      }
        this.line = line;
        this.rows = line + 2;
        this.columns = line + 3;
        this.tableroImg= new Image();
        this.tableroImg.src='../assets/tablero.png';
        this.canvaJuego=document.getElementById('canvaJuego');
        canvasTablero=document.getElementById('canvasJuego');
        ctx=canvasTablero.getContext('2d');
        const imgTablero=new Image();
        imgTablero.src='../assets/tablero.png';
        this.initTablero();

        // this.tableroImg.onload=()=>{
        //   this.dibujarTablero();
        // }
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

    dibujarTablero(){
      if(this.canvaJuego){
        let ctx=this.canvaJuego.getContext('2d');
        if(ctx){
          console.log("dibujando tablero...");
          ctx.drawImage(this.tableroImg,0,0,this.canvaJuego.width,this.canvaJuego.height);
        }
      }
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

    colocarFicha(ficha, posY){
      if (posY < 0 || posY >= this.columns) {
        throw new Error('Posición fuera de los límites del tablero');
      }
      if (this.casilleros[0][posY].estaVacio()) { //checkeo que la columna no rebalse
        let ultimaFilaDisponible = this.rows - 1;  

        while (ultimaFilaDisponible > 0 && !this.casilleros[ultimaFilaDisponible][posY].estaVacio()) {
          ultimaFilaDisponible--;  // subo una fila hacia arriba
        }

        if(this.casilleros[ultimaFilaDisponible][posY].estaVacio()){
          this.casilleros[ultimaFilaDisponible][posY].colocarFicha(ficha); 
          this.imprimirTablero();

          if(this.verifyWinner(ultimaFilaDisponible, posY)){
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
