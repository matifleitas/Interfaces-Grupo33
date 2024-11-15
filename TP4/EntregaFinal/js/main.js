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
        logo.style.top = "90px";
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
