// Pantalla breve de carga y animaciones de entrada.
const pantallaCarga = document.querySelector(".page-loader");
let observador;

function ocultarCarga() {
    document.body.classList.remove("page-loading");
}

if (pantallaCarga) {
    window.addEventListener("load", function () {
        setTimeout(ocultarCarga, 450);
    });

    // Evita dejar la pantalla de carga pegada si una imagen tarda demasiado.
    setTimeout(ocultarCarga, 5000);
}

function observarEntrada(elemento) {
    elemento.classList.add("reveal-on-scroll");

    if (observador) {
        observador.observe(elemento);
    } else {
        elemento.classList.add("is-visible");
    }
}

window.observarEntrada = observarEntrada;

if ("IntersectionObserver" in window) {
    observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("is-visible");
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.12 });
}

document.querySelectorAll("main > section:not(.home-opening)").forEach(observarEntrada);
