document.addEventListener("DOMContentLoaded", function () {
    const characters = document.querySelectorAll(".characters div"); 

    window.addEventListener("scroll", () => {
        const windowHeight = window.innerHeight;

        characters.forEach((character, index) => {
            const posPj = character.getBoundingClientRect().top / 2;//donde estan
            const activar = windowHeight / 1.9; 
            console.log("que onda aca????")
            console.log("que odna este trigerPoint: "+activar);
            if (posPj < activar) {
                setTimeout(() => {
                    character.style.transform = "translateX(0)"; 
                    character.style.opacity = "1"; 
                }, index * 90); 
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const logo = document.getElementById('logoPage');
    window.addEventListener("scroll", () => {
        logo.style.transform = "scale(0.4)";  
        logo.style.transition = "transform 0.6s ease";
        logo.style.position = "absolute";
        logo.style.top = "10px";
        logo.style.marginLeft = "10px";
        logo.style.zIndex = "3";

/* 
        characters.forEach((character, index) => {
            const posPj = character.getBoundingClientRect().top / 2;//donde estan
            const activar = windowHeight / 1.9; 
            console.log("que onda aca????")
            console.log("que odna este trigerPoint: "+activar);
            if (posPj < activar) {
                setTimeout(() => {
                    character.style.transform = "translateX(0)"; 
                    character.style.opacity = "1"; 
                }, index * 90); 
            }
        }); */
    });
});

(function () {
    document.addEventListener("mousemove", parallax);
    const elem = document.querySelector("#parallaxPjs");
    function parallax(e) {
        const _w = window.innerWidth / 2; //mitad de pantalla
        const _h = window.innerHeight / 2;
        const _mouseX = e.clientX;
        const _mouseY = e.clientY;

        const _depth1 = `${75.6 - (_mouseX - _w) * 0.002}% ${75.6 - (_mouseY - _h) * 0.002}%`; // movimiento en direccion contrario al mouse
        const _depth2 = `${75.6 - (_mouseX - _w) * 0.004}% ${75.6 - (_mouseY - _h) * 0.004}%`;
        const _depth3 = `${75.6 - (_mouseX - _w) * 0.008}% ${75.6 - (_mouseY - _h) * 0.008}%`;

        const x = `${_depth3}, ${_depth2}, ${_depth1}`; 
        elem.style.backgroundPosition = x; //lo mueve
    }
})();

