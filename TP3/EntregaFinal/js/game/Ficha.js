'use strict';
export default class Ficha {
    constructor(equipo) {
        this.equipo = equipo;
        this.selected = false;
    }

    setSelecter() {
        this.selected = !this.selected;
    }

    getEquipo() {
        return this.equipo;
    }

    draw() {
        //se dibuja
    }

    clear() {
        //se borra
    }

    esIgualA(ficha) {
        return this.equipo === ficha.getEquipo();
    }
}
