'use strict';
export default class Ficha {
    constructor(equipo,radio,posX,posY) {
        this.equipo = equipo;
        this.selected = false;
        this.radio=radio;
        this.posX=posX;
        this.posY=posY;
    }

    dibujarFicha(ctx){
        console.log('dibujando ficha...');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        console.log('dibujada');
        
    }

    setSelecter() {
        this.selected = !this.selected;
    }

    getEquipo() {
        return this.equipo;
    }

    clear() {
        //se borra
    }

    esIgualA(ficha) {
        return this.equipo === ficha.getEquipo();
    }

    cursorDentro(x, y){{
        let posX = this.x - x;
        let posY = this.y - y;
        return Math.sqrt(posX * posX + posY * posY) < this.radio;
    }}
}
