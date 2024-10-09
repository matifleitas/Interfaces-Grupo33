'use strict'

let btnNext = document.querySelectorAll(".arrowRigth");
let btnBefore = document.querySelectorAll(".arrowLeft");

btnNext.forEach(btn => {
    btn.addEventListener("click", function (e) {
        // Encuentra el contenedor más cercano del carrusel en el que está el botón
        let cardContainer = e.target.closest(".conteiner-carruselPrimary");
        // Selecciona solo las tarjetas dentro de ese contenedor
        let cards = cardContainer.querySelectorAll(".card-game");
        translateCarrousel(cards); // Mueve solo las tarjetas de ese carrusel
    });
});

btnBefore.forEach(btn => {
    btn.addEventListener("click", function (e) {
        // Encuentra el contenedor más cercano del carrusel en el que está el botón
        let cardContainer = e.target.closest(".conteiner-carruselPrimary");
        // Selecciona solo las tarjetas dentro de ese contenedor
        let cards = cardContainer.querySelectorAll(".card-game");
        translateCarrouselLeft(cards); // Mueve solo las tarjetas de ese carrusel
    });
});

// -----------funciones-------------
function translateCarrousel(cardSize) {
    for (let index = 0; index < cardSize.length; index++) {
        cardSize[index].style.transform = "translateX(-40%)";
        cardSize[index].style.transition = "0.5s";
    }
}

function translateCarrouselLeft(cardSize) {
    for (let index = 0; index < cardSize.length; index++) {
        cardSize[index].style.transform = "translateX(0)";
        cardSize[index].style.transition = "0.5s";
    }
}

let verticalNav = document.querySelector(".vertical-nav-wrapper")
document.querySelector('.btn-hamburguesa').addEventListener(
    'click', () => {
        if (verticalNav.style.transform === "translate(0%)") {
            verticalNav.style.transform = "translate(-100%)";
            conteinerVertical.style.transform = "translate(-100%)";
        } else {
            verticalNav.style.transform = "translate(0%)";
        }
    })
