let card = document.querySelectorAll(".card-game");
let btnNext = document.querySelector(".arrowRigth").addEventListener(
    "click", (e) => {
        for (let index = 0; index < card.length; index++) {
            console.log("Entre")
            card[index].style.transform = "translateX(-40%)"
            card[index].style.transition = "2s"
        }

    });
let btnBefore = document.querySelector(".arrowLeft").addEventListener(
    "click", (e) => {
        for (let index = 0; index < card.length; index++) {
            console.log("Entre")
            card[index].style.transform = "translateX(0)"
            card[index].style.transition = "2s"
        }
    }
)