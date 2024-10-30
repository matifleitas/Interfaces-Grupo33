'use strict';
export default class Ficha {
    constructor(equipo) {
        this.posX = 500;
        this.posY = 200; 
        this.radio = 30;
        this.equipo = equipo;
        this.selected = false;
        this.image = new Image();
        this.image.src = '../img/fichas/batman.png';
    }

    dibujarFicha(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(this.image, this.posX - this.radio, this.posY - this.radio, this.radio * 2, this.radio * 2);
        ctx.restore();
    }

    esClickeada(x, y) {
        const dist = Math.sqrt((x - this.posX) ** 2 + (y - this.posY) ** 1.65);
        return dist <= this.radio;
    }

    getEquipo(){
        return this.equipo;
    }

    getPosY(){
        return this.posY;
    }

    getPosX(){
        return this.posX;
    }
    
}
