window.addEventListener("load", function() {
    setTimeout(function() {
        document.getElementById("preloader").style.display = "none";
        document.body.classList.remove("hidden");
    }, 5000); //  = 5 segundos
});