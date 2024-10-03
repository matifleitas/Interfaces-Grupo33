//-------- preloader ------
window.addEventListener("load", function() {
    // Espera 5 segundos antes de quitar el preloader
    setTimeout(function() {
        document.getElementById("preloader").style.display = "none";
        document.body.classList.remove("hidden");
    }, 3000); //  = 5 segundos
});