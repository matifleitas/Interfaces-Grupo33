'use strict'
let cards = document.querySelectorAll(".cardGame");
// let cardSecundary = document.querySelectorAll(".cardGameSecundary");

// let btnNext = document.querySelector(".arrowRigth").addEventListener(
//     "click", (e) => {
//         translateCarrousel(cards);
//     });

// let btnNextSec = document.querySelector("#btnNext-carruselSec").addEventListener(
//     "click", (e) => {
//         translateCarrousel(cardSecundary);
//     });

// let btnBefore = document.querySelector(".arrowLeft").addEventListener(
//     "click", (e) => {
//         translateCarrouselLeft(cards);
//     }
// )

// let btnBeforeSecundary = document.querySelector("#btnBefore-carruselSec").addEventListener(
//     "click", (e) => {
//         translateCarrouselLeft(cardSecundary)
//     }
// )

let btnNext = document.querySelectorAll(".arrowRigth").addEventListener();

btnNext.array.forEach(btn => {
    btn.addEventListener(
        "click", () => {
            translateCarrouselLeft(cards)
        }
    )
});

let btnBefore = document.querySelectorAll(".arrowLeft").addEventListener();

btnBefore.array.forEach(btn => {
    btn.addEventListener(
        "click", () => {
            console.log("leegie")
            translateCarrouselLeft(cards)
        }
    )
});

// let conteinerVertical = document.querySelector(".vertical-nav-wrapper")
let verticalNav = document.querySelector(".vertical-nav-wrapper")
document.querySelector('.btn-hamburguesa').addEventListener(
    'click', () => {
        if (verticalNav.style.transform === "translate(0%)") {
            verticalNav.style.transform = "translate(-100%)";
            conteinerVertical.style.transform = "translate(-100%)";
        } else {
            verticalNav.style.transform = "translate(0%)";
        }
        // document.querySelector('.vertical-nav-wrapper').classList.toggle('active');
    })








/*
const popover = document.querySelector("#id-popover");
const login = document.querySelector('login-container');
login.addEventListener('submit', (event) => {
    event.preventDefault();
    popover.showPopver();
})
*/

// -----------funciones-------------
function translateCarrousel(cardSize) {
    for (let index = 0; index < cardSize.length; index++) {
        cardSize[index].style.transform = "translateX(-40%)"
        cardSize[index].style.transition = "0.5s"
    }
}
function translateCarrouselLeft(cardSize) {
    for (let index = 0; index < cardSize.length; index++) {
        cardSize[index].style.transform = "translateX(0)"
        cardSize[index].style.transition = "0.5s"
    }
}
