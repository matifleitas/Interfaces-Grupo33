'use strict';
import Juego from './Juego.js';

document.addEventListener('DOMContentLoaded', () => {
    const formLineas = document.getElementById('formLineas');
    document.getElementById('changeScreen').addEventListener('click',()=> {
        document.getElementById('elementsPortada').classList.add('taparJuego');
        document.getElementById('formLineas').classList.remove('taparJuego');
        
    })

    formLineas.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario

        // Obtén el valor del radio seleccionado
        const tipoSeleccionado = document.querySelector('input[name="tipo"]:checked').value;
        const cantidadEnLinea = parseInt(tipoSeleccionado);

        // Inicia el juego con la cantidad de fichas en línea elegidas por el usuario
        const juego = new Juego(cantidadEnLinea);

        juego.cambiarPantallas();
        juego.initGame();

    });
});
