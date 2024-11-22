document.addEventListener("DOMContentLoaded", function () {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.onload = () => {
      window.scrollTo(0, 0);
  };
  
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
;
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

  tv.style.transition = "opacity 1s"; 
  tv.style.opacity = 1;

  setInterval(() => {
    tv.style.opacity = 0;
 
    setTimeout(() => {
      tv.style.backgroundImage = `url(${fondos[pos]})`;
      pos = (pos + 1) % fondos.length; 

     
      tv.style.opacity = 1;
    }, 400);
  }, 3000); 
}

function moveBig1Mouse() {
  const modelViewer = document.getElementById("viewer");

  document.addEventListener("mousemove", (event) => {
    const { clientX, clientY } = event;

    const xRotacion = ((clientX / window.innerWidth) + 1) * 360; 
    const yRotacion = ((clientY / window.innerHeight) + 0.5) * 95;

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

  characters.forEach((character) => {
    character.classList.add("hidden");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Sección visible");
        } else {
          characters.forEach((character) => {
            character.classList.add("hidden");
          });
        }
      });
    },
    { threshold: 0.8 } // detecta cuando la sección está al menos un 80% visible
  );

  observer.observe(section);

  // lógica para sincronizar las imágenes con el texto durante el scroll
  section.addEventListener("scroll", () => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionHeight = section.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;

    textBlocks.forEach((block, index) => {
      const blockTop = block.getBoundingClientRect().top;
      const blockBottom = block.getBoundingClientRect().bottom;

      // verifico si el bloque de texto está dentro de la sección visible
      if (blockTop >= sectionTop && blockBottom <= sectionBottom) {
        // ocultamos todos los personajes antes de mostrar el correspondiente
        characters.forEach((character) => {
          character.classList.add("hidden");
        });

        // mostramos solo el personaje correspondiente al índice del bloque visible
        characters[index]?.classList.remove("hidden");
      }
    });
  });
}

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
      threshold: 0.8,
    }
  );
  elements.forEach((element) => {
    observer.observe(element);
  });
}

window.addEventListener("load", function() {
  document.body.style.overflow = 'hidden';
  document.querySelector('.loader-container').classList.add('active');
  setTimeout(function() {
    document.querySelector('.loader-container').classList.remove('active');
    document.querySelector('.loader-container').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.querySelector('.header').style.opacity = 1; // Muestra el header
  }, 2500);
});

