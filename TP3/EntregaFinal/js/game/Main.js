'use strict';
import Juego from './Juego.js';  // Importación por defecto

const juego = new Juego(4); // 4 en linea 

juego.tablero.colocarFicha(juego.getEquipoJ1(), 2, 4);
juego.tablero.colocarFicha(juego.getEquipoJ1(), 2, 3);
juego.tablero.colocarFicha(juego.getEquipoJ1(), 2, 2);
juego.tablero.colocarFicha(juego.getEquipoJ1(), 2, 1);