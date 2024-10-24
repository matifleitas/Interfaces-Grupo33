'use strict';
import Juego from './Juego.js';  // Importación por defecto

const juego = new Juego(4); // 4 en línea 

// Colocando fichas en posiciones válidas


juego.tablero.colocarFicha(juego.j2, 3);
juego.tablero.colocarFicha(juego.j2, 3);
juego.tablero.colocarFicha(juego.j2, 3);
juego.tablero.colocarFicha(juego.j1, 3);
juego.tablero.colocarFicha(juego.j2, 4);