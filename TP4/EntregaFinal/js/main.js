document.addEventListener("DOMContentLoaded", function () {
  initCharacterAnimation();
  initScrollEffect();
  initParallaxEffect();
  changeTvBackground();
  moveBig1Mouse();
  const navToggle = document.getElementById("navToggle");
  const menu = document.getElementById("menu");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    menu.classList.remove('hidden')
    menu.classList.toggle("open");
  });
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

function initScrollEffect() {
  const navbar = document.querySelector(".navBar");
  const logoLarge = document.getElementById("logoPage");
  const logoSmall = document.querySelector(".logoSmall");

  window.addEventListener("scroll", () => {
    const logoPosition = logoLarge.getBoundingClientRect().top;

    if (logoPosition <= navbar.offsetHeight) {
      navbar.classList.add("scrolled");
      logoLarge.style.transform = "scale(0.3)";
      logoLarge.style.opacity = "0";
      logoLarge.style.transition = "transform 0.6s ease, opacity 0.6s ease";
      logoSmall.classList.remove("hidden");
    }
  });
}

// function initLogoScrollEffect() {
//   const logoBig = document.getElementById("logoPage");
//   const navbar = document.getElementById("navbar");
//   const logoSmall = document.getElementById("logoSmall");

//   window.addEventListener("scroll", () => {
//     logoBig.style.transform = "scale(0.3)";
//     logoBig.style.transition = "transform 0.6s ease";
//   });
// }

function initParallaxEffect() {
  document.addEventListener("mousemove", parallax);

  const elem = document.querySelector("#parallaxPjs");

  function parallax(e) {
    const _w = window.innerWidth / 2; // mitad de pantalla
    const _h = window.innerHeight / 2;
    const _mouseX = e.clientX;
    const _mouseY = e.clientY;

    const _depth1 = `${75.6 - (_mouseX - _w) * 0.002}% ${
      75.6 - (_mouseY - _h) * 0.002
    }%`; // movimiento en dirección contraria al mouse
    const _depth2 = `${75.6 - (_mouseX - _w) * 0.004}% ${
      75.6 - (_mouseY - _h) * 0.004
    }%`;
    const _depth3 = `${75.6 - (_mouseX - _w) * 0.008}% ${
      75.6 - (_mouseY - _h) * 0.008
    }%`;

    const x = `${_depth3}, ${_depth2}, ${_depth1}`;
    elem.style.backgroundPosition = x; // lo mueve
  }
}

function changeTvBackground() {
  let pos = 0;
  const tv = document.querySelector(".tv");
  const fondos = [
    "assets/fondoTv2.png",
    "assets/fondoTv3.png",
    "assets/fondoTv4.png",
  ];

  setInterval(() => {
    tv.style.backgroundImage = `url(${fondos[pos]})`;
    pos = (pos + 1) % fondos.length; // vuelvo al inicio cuando termine el array
  }, 3000);
}

/* function moveBig1Mouse(){
  const modelViewer = document.getElementById('viewer');

  // Escuchar el movimiento del mouse
  document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;

    // Normalizar las posiciones del mouse
    const xRotation = ((clientX / window.innerWidth) - 0.5) * 360; // Gira en el eje Y
    const yRotation = ((clientY / window.innerHeight) - 0.5) * -90; // Gira en el eje X (invertido)

    // Aplicar la rotación al modelo
    modelViewer.cameraOrbit = `${xRotation}deg ${yRotation}deg 2.5m`;
  });
} */


// function changeIconNav() {
//   const navbar = document.getElementById("navbar");
//   const logoSmall = document.getElementById("logoSmall");
//   const logoLarge = document.getElementById("logoPage");

//   window.addEventListener("scroll", () => {
//     const logoPosition = logoLarge.getBoundingClientRect().top;

//     if (logoPosition <= 0) {
//       console.log("en funcion");
//       logoSmall.classList.remove("hidden");
//       logoLarge.style.opacity = "0";
//       logoLarge.style.transform = "scale(0.8)";
//       navbar.classList.add("scrolled");
//     } else {
//       // Volver al estado original
//       logoSmall.classList.add("hidden");
//       logoLarge.style.opacity = "1";
//       logoLarge.style.transform = "scale(1)";
//     }
//   });
// }
