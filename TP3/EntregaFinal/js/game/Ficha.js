'use strict';
export default class Ficha {
    constructor(posX,posY,equipo) {
        this.posX = posX;
        this.posY = posY; 
        this.radio = 35;
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
        //console.log('ficha dibujada en:' + this.posX,this.posY);
        
    }

    esClickeada(x, y) {
        const dist = Math.sqrt((x - this.posX) ** 2 + (y - this.posY) ** 2);
        return dist <= this.radio;
    }

    setPosicion(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }

    getPosicion(){
        return this.getPosX, this.posY;
    }

    getEquipo(){
        return this.equipo;
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    setPosY(posY) {
        this.posY = posY;
    }

    setPosX(posX) {

        this.posX = posX;
    }

}
