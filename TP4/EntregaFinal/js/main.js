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

  //menu hamburguesa
  const navToggle = document.getElementById("navToggle");
  const menu = document.getElementById("menu");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    menu.classList.remove('hidden')
    menu.classList.toggle("open");
  });
});

function suscribeAlert(){
  const alert=document.getElementById('suscribeAlert');

  document.getElementById('btnSuscribe').addEventListener("click", () =>{
    alert.classList.remove('hidden');
    alert.classList.add('show');

    setTimeout(() => {
      alert.classList.remove('show');
      alert.classList.add('hidden');
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
  var scroll = window.scrollY;  // Obtiene la cantidad de desplazamiento vertical

  window.addEventListener("scroll", () => {
    var scale = 1 - scroll / 1000;  // Aquí puedes ajustar la fórmula según lo que necesites

    // Si el factor de escala es mayor que 0, se aplica; de lo contrario, se mantiene en tamaño original
    if (scale > 0.1) {  // Limita la escala para que no desaparezca completamente
      logo.style.transform = 'scale(' + scale + ')';
      logo.style.transform='scale(0.3)';
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


function moveBig1Mouse(){
  const modelViewer = document.getElementById('viewer');

  
  document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;

    const xRotacion = ((clientX / window.innerWidth) + 1) * 360; 
    const yRotacion = ((clientY / window.innerHeight) + 0.5) * 95;

    modelViewer.cameraOrbit = `${xRotacion}deg ${yRotacion}deg`;
  });
}

function parallaxSection2(){
  //
}

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

function parallaxPage1() {
  const parallaxElements = document.querySelectorAll('.arbol1, .arbol2, .arbol3, .roca1, .arbusto1, .arbusto2, #arbolGrande, .roca2, .roca3, .roca4, .arbusto3, .arbusto4, .elem2,.elem1, .elem3');

  window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY;

    parallaxElements.forEach((elem, index) => {
      let speed = 0.3 + (index * 0.01); 
      elem.style.transform = `translateY(${scrollTop * -speed}px)`; 
      });
  });
}

function parallaxPage2(){
  const parallaxElementos = document.querySelectorAll(".elem5, .elem4, .description, .tittle");
  
  window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY;
    parallaxElementos.forEach((elem, index) => {
      let speed = 0.2 + (index * 0.02);
      elem.style.transform = `translateY(${scrollTop * -speed}px)`;
    });
  });
}

function parallaxPage6() {
  const parallaxElement = document.querySelector(".pjVideo"); 

  window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY;
    let speed = 0.001; 
    parallaxElement.style.transform = `translateX(${scrollTop * speed}px)`;
  });
}

function initScrollRevealEffect() {
  // Seleccionamos todos los divs dentro de la sección .section3
  const elements = document.querySelectorAll('.section3 div');

  // Creamos el observer con un callback que añade la clase 'visible'
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Retrasamos la aparición según el índice del elemento
        setTimeout(() => {
          entry.target.classList.add('visible'); // Añadimos la clase visible
          observer.unobserve(entry.target); // Dejamos de observar este elemento
        }, index * 300); // Retraso de 300ms entre cada elemento
      }
    });
  }, {
    threshold: 0.5 // El elemento debe estar al menos al 50% visible
  });

  // Observamos cada elemento seleccionado
  elements.forEach(element => {
    observer.observe(element);
  });
}
