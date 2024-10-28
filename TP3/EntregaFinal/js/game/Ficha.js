'use strict';
export default class Ficha {
    constructor(equipo) {
        this.equipo = equipo;
        this.selected = false;
        this.image= new Image();
        this.image.src=('../img/fichas/batman.png');
    }

    dibujarFicha(ctx,x,y,radio){
        console.log('dibujando ficha...');
        ctx.beginPath();
        ctx.arc(x,y,radio, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(this.image, x - radio, y - radio, radio * 2, radio * 2);
        ctx.restore();
        console.log('dibujada');
        
    }


    getFicha(){
        return this;
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
