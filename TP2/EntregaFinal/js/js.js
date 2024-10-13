'use strict'

let cards = document.querySelectorAll(".card-game")
let btnNext = document.querySelectorAll(".arrowRigth");
let btnBefore = document.querySelectorAll(".arrowLeft");
let operacion = 0;
let counter = 0
let pixelWidth = 1;
let widthImg = (1600 / cards.length) + pixelWidth;


btnNext.forEach(btn => {
    btn.addEventListener("click", function (e) {
        // Encuentra el contenedor más cercano del carrusel en el que está el botón
        let cardContainer = e.target.closest(".conteiner-carruselPrimary");
        if (counter >= cards.length - 1) {
            counter = 0;
            operacion = 0;
            // Selecciona solo las tarjetas dentro de ese contenedor
            cards = cardContainer.querySelectorAll(".card-game");
            translateCarrousel(cards, operacion);
        }
        else {
            counter++;
            operacion = operacion + widthImg;
            cards = cardContainer.querySelectorAll(".card-game");
            translateCarrousel(cards, operacion);
        }
    });
});

btnBefore.forEach(btn => {
    btn.addEventListener("click", function (e) {
        let cardContainer = e.target.closest(".conteiner-carruselPrimary");
        counter--;

        if (counter < 0) {
            counter = cards.length - 1;
            cards = cardContainer.querySelectorAll(".card-game");
            operacion = widthImg * (cards.length - 1);
            translateCarrouselLeft(cards, operacion);
        }
        else {
            operacion = operacion - widthImg;
            cards = cardContainer.querySelectorAll(".card-game");
            translateCarrouselLeft(cards, operacion);
        }
    });
});

// -------------- botones para el Destkop------------------
// btnNext.forEach(btn => {
//     btn.addEventListener("click", function (e) {
//         // Encuentra el contenedor más cercano del carrusel en el que está el botón
//         let cardContainer = e.target.closest(".conteiner-carruselPrimary");
//         cards = cardContainer.querySelectorAll(".card-game");
//         translateCarrousel(cards);
//     });
// });

// btnBefore.forEach(btn => {
//     btn.addEventListener("click", function (e) {
//         let cardContainer = e.target.closest(".conteiner-carruselPrimary");
//         cards = cardContainer.querySelectorAll(".card-game");
//         translateCarrouselLeft(cards); // Mueve solo las tarjetas de ese carrusel

//     });
// });

// -----------funciones-------------
function translateCarrousel(cardSize, operacion) {
    for (let index = 0; index < cardSize.length; index++) {
        cardSize[index].style.transform = `translate(-${operacion}%)`;
        cardSize[index].style.transition = " ease-in-out .6s";

    }
}

function translateCarrouselLeft(cardSize, operacion) {
    for (let index = 0; index < cardSize.length; index++) {
        cardSize[index].style.transform = `translate(-${operacion}%)`;
        cardSize[index].style.transition = " ease-in-out .6s";
    }
}


// -----------------funciones para desktop----------
// function translateCarrousel(cardSize) {
//     for (let index = 0; index < cardSize.length; index++) {
//         console.log(cardSize.length)
//         cardSize[index].style.transform = "translateX(-25%)";
//         cardSize[index].style.transition = "0.5s";
//     }
// }

// function translateCarrouselLeft(cardSize) {
//     for (let index = 0; index < cardSize.length; index++) {
//         cardSize[index].style.transform = "translateX(0)";
//         cardSize[index].style.transition = "0.5s";
//     }
// }

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

