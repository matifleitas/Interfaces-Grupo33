document.addEventListener("DOMContentLoaded", function () {
  initCharacterAnimation();
  initScrollEffectPage1();
  initParallaxEffect();
  changeTvBackground();
  moveBig1Mouse();
  parallaxPage1();
  parallaxPage2();
  parallaxPage6();
  initScrollRevealEffect();
  suscribeAlert();
  parallaxPage5();

  //menu hamburguesa
  const navToggle = document.getElementById("navToggle");
  const menu = document.getElementById("menu");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    menu.classList.remove("hidden");
    menu.classList.toggle("open");
  });

  window.addEventListener("beforeunload", function () {
    window.scrollTo(0, 0);
  });
});

function suscribeAlert() {
  const alert = document.getElementById("suscribeAlert");
  const input = document.getElementById("inputEmail");

  document.getElementById("btnSuscribe").addEventListener("click", () => {
    alert.classList.remove("hidden");
    alert.classList.add("show");
    input.value = "";

    setTimeout(() => {
      alert.classList.remove("show");
      alert.classList.add("hidden");
    }, 5000);
  });
}

function initCharacterAnimation() {
  const characters = document.querySelectorAll(".characters div");

  window.addEventListener("scroll", () => {
    const windowHeight = window.innerHeight;

    characters.forEach((character, index) => {
      const posPj = character.getBoundingClientRect().top / 2; // posición del elemento
      const punto = windowHeight / 1.9;

      if (posPj < punto) {
        setTimeout(() => {
          character.style.transform = "translateX(0)";
          character.style.opacity = "1";
        }, index * 90);
      }
    });
  });
}

function initScrollEffectPage1() {
  const navbar = document.querySelector(".navBar");
  const logo = document.querySelector(".logoSmall");
  var scroll = window.scrollY; // Obtiene la cantidad de desplazamiento vertical

  window.addEventListener("scroll", () => {
    var scale = 1 - scroll / 1000; // Aquí puedes ajustar la fórmula según lo que necesites

    // Si el factor de escala es mayor que 0, se aplica; de lo contrario, se mantiene en tamaño original
    if (scale > 0.1) {
      // Limita la escala para que no desaparezca completamente
      logo.style.transform = "scale(" + scale + ")";
      logo.style.transform = "scale(0.3)";
    }
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

    const _depth1X = 102 - (_mouseX - _w) * 0.004;
    const _depth1Y = 102 - (_mouseY - _h) * 0.004;

    const _depth2X = 102 - (_mouseX - _w) * 0.005;
    const _depth2Y = 102 - (_mouseY - _h) * 0.005;

    const _depth3X = 102 - (_mouseX - _w) * 0.009;
    const _depth3Y = 102 - (_mouseY - _h) * 0.009;

    const backgroundPosition = `${_depth3X}% ${_depth3Y}%, ${_depth2X}% ${_depth2Y}%, ${_depth1X}% ${_depth1Y}%`;

    elem.style.backgroundPosition = backgroundPosition;
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

function moveBig1Mouse() {
  const modelViewer = document.getElementById("viewer");

  document.addEventListener("mousemove", (event) => {
    const { clientX, clientY } = event;

    const xRotacion = (clientX / window.innerWidth - 0.5) * 360;
    const yRotacion = (clientY / window.innerHeight + 0.5) * 95;

    modelViewer.cameraOrbit = `${xRotacion}deg ${yRotacion}deg`;
  });
}

function parallaxPage1() {
  const parallaxElements = document.querySelectorAll(
    ".arbol1, .arbol2, .arbol3, .roca1, .arbusto1, .arbusto2, #arbolGrande, .roca2, .roca3, .roca4, .arbusto3, .arbusto4, .elem2,.elem1, .elem3"
  );

  window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY;

    parallaxElements.forEach((elem, index) => {
      let speed = 0.3 + index * 0.01;
      elem.style.transform = `translateY(${scrollTop * -speed}px)`;
    });
  });
}

function parallaxPage2() {
  const parallaxElementos = document.querySelectorAll(
    ".elem5, .elem4, .description, .tittle"
  );

  window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY;
    parallaxElementos.forEach((elem, index) => {
      let speed = 0.2 + index * 0.02;
      elem.style.transform = `translateY(${scrollTop * -speed}px)`;
    });
  });
}

function parallaxPage5() {
  const section = document.querySelector(".page5");
  const characters = document.querySelectorAll(".characters div");
  const textBlocks = document.querySelectorAll(".txtInfo .txtBody");
  const visibilityOffset = 200; // Offset para ajustar cuándo mostrar los personajes

  // 1. Función para verificar si la sección está visible en el viewport
  const checkIfSectionVisible = () => {
    const sectionRect = section.getBoundingClientRect();

    if (
      sectionRect.top < window.innerHeight - visibilityOffset && // La sección está suficientemente abajo
      sectionRect.bottom > visibilityOffset // La sección no está totalmente fuera por abajo
    ) {
      // Mostrar el primer personaje si no hay ninguno visible
      if (!characters[0].classList.contains("hidden")) return;
      characters[0].classList.remove("hidden");
    }
  };

  // 2. Función para manejar el scroll dentro de la sección
  const handleSectionScroll = () => {
    const sectionRect = section.getBoundingClientRect();

    if (
      sectionRect.bottom > 0 && // Asegurarse de que la sección esté visible
      sectionRect.top < window.innerHeight
    ) {
      textBlocks.forEach((block, index) => {
        const blockRect = block.getBoundingClientRect();

        // Comprobar si el bloque está visible dentro de la sección
        if (
          blockRect.top >= sectionRect.top &&
          blockRect.bottom <= sectionRect.bottom
        ) {
          // Mostrar solo el personaje correspondiente
          characters.forEach((character) => {
            character.classList.add("hidden");
          });
          characters[index]?.classList.remove("hidden");
        }
      });
    }
  };

  // 3. Función para ocultar los personajes si la sección no está visible
  const handleGlobalScroll = () => {
    const sectionRect = section.getBoundingClientRect();

    if (
      sectionRect.bottom < 0 || // Sección fuera por arriba
      sectionRect.top > window.innerHeight // Sección fuera por abajo
    ) {
      // Ocultar todos los personajes
      characters.forEach((character) => {
        character.classList.add("hidden");
      });
    }
  };

  // Agregar los listeners de scroll
  window.addEventListener("scroll", checkIfSectionVisible);
  section.addEventListener("scroll", handleSectionScroll);
  window.addEventListener("scroll", handleGlobalScroll);

  // Inicialización para verificar visibilidad al cargar la página
  checkIfSectionVisible();
}



// function parallaxPage5() {
//   const section = document.querySelector(".page5");
//   const characters = document.querySelectorAll(".characters div");
//   const textBlocks = document.querySelectorAll(".txtInfo .txtBody");

//   // Establecer visibilidad de los personajes al entrar a la sección
//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           // Cuando la sección .page5 esté visible, se muestran los personajes
//           characters.forEach((character) => {
//             character.classList.remove("hidden");
//           });
//         } else {
//           // Cuando la sección .page5 no esté visible, se ocultan los personajes
//           characters.forEach((character) => {
//             character.classList.add("hidden");
//           });
//         }
//       });
//     },
//     { threshold: 0.1 } // Detectar cuando la sección .page5 tenga al menos un 10% visible
//   );

//   observer.observe(section);  // Observar la sección .page5

//   // Función para cambiar los personajes con el scroll dentro de la sección
//   section.addEventListener("scroll", () => {
//     const sectionTop = section.getBoundingClientRect().top; // Posición de la sección
//     const sectionHeight = section.offsetHeight; // Altura de la sección
//     const sectionBottom = sectionTop + sectionHeight; // Final de la sección

//     textBlocks.forEach((block, index) => {
//       const blockTop = block.getBoundingClientRect().top; // Posición del bloque
//       const blockBottom = block.getBoundingClientRect().bottom; // Posición inferior del bloque

//       // Verificamos si el bloque de texto está dentro de la sección visible
//       if (blockTop >= sectionTop && blockBottom <= sectionBottom) {
//         // Si el bloque está visible, ocultamos todos los personajes
//         characters.forEach((character) => {
//           character.classList.add("hidden");
//         });

//         // Mostramos el personaje correspondiente al índice del bloque visible
//         characters[index]?.classList.remove("hidden");
//       }
//     });
//   });
// }

function parallaxPage6() {
  const parallaxElement = document.querySelector(".pjVideo");

  window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY;
    let speed = 0.001;
    parallaxElement.style.transform = `translateX(${scrollTop * speed}px)`;
  });
}

function initScrollRevealEffect() {
  const elements = document.querySelectorAll(".section3 div");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }, index * 300);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );
  elements.forEach((element) => {
    observer.observe(element);
  });
}
