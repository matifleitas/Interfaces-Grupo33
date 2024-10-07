window.addEventListener("load", function() {
    setTimeout(function() {
        document.getElementById("preloader").style.display = "none";
        document.body.classList.remove("hidden");
    }, 4000); //  preguntar = 5 segundos
});