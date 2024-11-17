document.addEventListener("DOMContentLoaded", function () {
    initCharacterAnimation();
    initLogoScrollEffect();
    initParallaxEffect();
    changeTvBackground();
});

function initCharacterAnimation() {
    const characters = document.querySelectorAll(".characters div");

    window.addEventListener("scroll", () => {
        const windowHeight = window.innerHeight;

        characters.forEach((character, index) => {
            const posPj = character.getBoundingClientRect().top / 2; // posición del elemento
            const triggerPoint = windowHeight / 1.9;

            if (posPj < triggerPoint) {
                setTimeout(() => {
                    character.style.transform = "translateX(0)";
                    character.style.opacity = "1";
                }, index * 90);
            }
        });
    });
}

function initLogoScrollEffect() {
    const logo = document.getElementById("logoPage");

    window.addEventListener("scroll", () => {
        logo.style.transform = "scale(0.4)";
        logo.style.transition = "transform 0.6s ease";
        logo.style.position = "absolute";
        logo.style.top = "10px";
        logo.style.marginLeft = "10px";
        logo.style.zIndex = "3";
    });
}

function initParallaxEffect() {
    document.addEventListener("mousemove", parallax);

    const elem = document.querySelector("#parallaxPjs");

    function parallax(e) {
        const _w = window.innerWidth / 2; // mitad de pantalla
        const _h = window.innerHeight / 2;
        const _mouseX = e.clientX;
        const _mouseY = e.clientY;

        const _depth1 = `${75.6 - (_mouseX - _w) * 0.002}% ${75.6 - (_mouseY - _h) * 0.002}%`; // movimiento en dirección contraria al mouse
        const _depth2 = `${75.6 - (_mouseX - _w) * 0.004}% ${75.6 - (_mouseY - _h) * 0.004}%`;
        const _depth3 = `${75.6 - (_mouseX - _w) * 0.008}% ${75.6 - (_mouseY - _h) * 0.008}%`;

        const x = `${_depth3}, ${_depth2}, ${_depth1}`;
        elem.style.backgroundPosition = x; // lo mueve
    }
}

function changeTvBackground(){
    let pos = 0;
    const tv = document.querySelector('.tv');
    const fondos = [
        "assets/fondoTv2.png", 
        "assets/fondoTv3.png",
        "assets/fondoTv4.png"
    ];
    
    setInterval(() => {
        tv.style.backgroundImage = `url(${fondos[pos]})`;
        pos = (pos + 1) % fondos.length; // vuelvo al inicio cuando termine el array
    }, 3000);
}
