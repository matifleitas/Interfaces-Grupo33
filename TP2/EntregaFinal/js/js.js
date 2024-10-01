let cards = document.querySelectorAll(".cardGame");
let cardSecundary = document.querySelectorAll(".cardGameSecundary");

let btnNext = document.querySelector(".arrowRigth").addEventListener(
    "click", (e) => {
        translateCarrousel(cards);
    });

let btnNextSec = document.querySelector("#btnNext-carruselSec").addEventListener(
    "click", (e) => {
        translateCarrousel(cardSecundary);
    });

let btnBefore = document.querySelector(".arrowLeft").addEventListener(
    "click", (e) => {
        translateCarrouselLeft(cards);
    }
)


/*
const popover = document.querySelector("#id-popover");
const login = document.querySelector('login-container');
login.addEventListener('submit', (event) => {
    event.preventDefault();
    popover.showPopver();
})
*/


  
btnSubmit.addEventListener('click', ocultarFormulario);
let btnBeforeSecundary = document.querySelector("#btnBefore-carruselSec").addEventListener(
    "click", (e) => {
        translateCarrouselLeft(cardSecundary)
    }
)


// -----------funciones-------------
function translateCarrousel(cardSize) {
    for (let index = 0; index < cardSize.length; index++) {
        cardSize[index].style.transform = "translateX(-40%)"
        cardSize[index].style.transition = "2s"
    }
}
function translateCarrouselLeft(cardSize) {
    for (let index = 0; index < cardSize.length; index++) {
        cardSize[index].style.transform = "translateX(0)"
        cardSize[index].style.transition = "2s"
    }
}
