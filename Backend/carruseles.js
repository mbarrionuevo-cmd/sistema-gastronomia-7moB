// Los carruseles usan platos recibidos desde la base de datos o desde platos.json.
const fotosDePlatos = [
    "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1536935338788846bb9981813?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85"
];

function crearTarjeta(plato, indice, clase) {
    const tarjeta = document.createElement("button");
    tarjeta.type = "button";
    tarjeta.className = clase;
    tarjeta.setAttribute("aria-label", "Ver " + plato.nombre);

    const imagen = document.createElement("img");
    imagen.src = fotosDePlatos[indice % fotosDePlatos.length];
    imagen.alt = plato.nombre;
    imagen.loading = "lazy";

    const texto = document.createElement("span");
    texto.className = "carousel-card-label";

    const categoria = document.createElement("small");
    categoria.textContent = plato.categoria;

    const nombre = document.createElement("strong");
    nombre.textContent = plato.nombre;

    texto.append(categoria, nombre);
    tarjeta.append(imagen, texto);
    return tarjeta;
}

function prepararCarruselUno(platos) {
    const carrusel = document.getElementById("carrusel-uno");
    const etapa = carrusel.querySelector(".carousel-one-stage");
    const tarjetas = platos.slice(0, 11).map(function (plato, indice) {
        const tarjeta = crearTarjeta(plato, indice, "carousel-one-card");
        tarjeta.addEventListener("click", function () {
            seleccion = indice;
            acomodar();
            mostrarDetalle(plato, indice);
        });
        etapa.appendChild(tarjeta);
        return tarjeta;
    });

    let seleccion = 0;

    function acomodar() {
        tarjetas.forEach(function (tarjeta, indice) {
            let distancia = indice - seleccion;
            const mitad = Math.floor(tarjetas.length / 2);
            if (distancia > mitad) distancia -= tarjetas.length;
            if (distancia < -mitad) distancia += tarjetas.length;

            const x = distancia * Math.min(125, etapa.clientWidth * 0.12);
            const z = -Math.abs(distancia) * 75;
            const giro = distancia * -8;
            const escala = 1 - Math.min(Math.abs(distancia) * 0.06, 0.34);
            tarjeta.style.transform = "translate(-50%,-50%) translateX(" + x + "px) translateZ(" + z + "px) rotateY(" + giro + "deg) scale(" + escala + ")";
            tarjeta.style.opacity = String(Math.max(0.12, 1 - Math.abs(distancia) * 0.16));
            tarjeta.style.zIndex = String(20 - Math.abs(distancia));
            tarjeta.style.filter = distancia === 0 ? "none" : "brightness(.72)";
        });
    }

    function mover(paso) {
        seleccion = (seleccion + paso + tarjetas.length) % tarjetas.length;
        acomodar();
    }

    carrusel.querySelector('[data-mover="anterior"]').addEventListener("click", function () { mover(-1); });
    carrusel.querySelector('[data-mover="siguiente"]').addEventListener("click", function () { mover(1); });
    prepararArrastre(etapa, mover);
    window.addEventListener("resize", acomodar);
    acomodar();
}

function prepararCarruselDos(platos) {
    const carrusel = document.getElementById("carrusel-dos");
    const etapa = carrusel.querySelector(".carousel-two-stage");
    const seleccionados = platos.slice(0, 10).reverse();
    let seleccion = 0;
    const tarjetas = seleccionados.map(function (plato, indice) {
        const tarjeta = crearTarjeta(plato, indice + 3, "carousel-two-card");
        tarjeta.addEventListener("click", function () {
            seleccion = indice;
            acomodar();
        });
        etapa.appendChild(tarjeta);
        return tarjeta;
    });

    function acomodar() {
        tarjetas.forEach(function (tarjeta, indice) {
            let distancia = indice - seleccion;
            const mitad = Math.floor(tarjetas.length / 2);
            if (distancia > mitad) distancia -= tarjetas.length;
            if (distancia < -mitad) distancia += tarjetas.length;

            const x = distancia * Math.min(128, etapa.clientWidth * 0.13);
            const y = Math.abs(distancia) * 12;
            const giro = distancia * 5;
            const escala = 1 - Math.min(Math.abs(distancia) * 0.055, 0.3);
            tarjeta.style.transform = "translate(-50%,-50%) translate(" + x + "px," + y + "px) rotate(" + giro + "deg) scale(" + escala + ")";
            tarjeta.style.opacity = String(Math.max(0.12, 1 - Math.abs(distancia) * 0.15));
            tarjeta.style.zIndex = String(20 - Math.abs(distancia));
            tarjeta.style.filter = distancia === 0 ? "none" : "brightness(.68)";
        });
    }

    function mover(paso) {
        seleccion = (seleccion + paso + tarjetas.length) % tarjetas.length;
        acomodar();
    }

    carrusel.querySelector('[data-mover="anterior"]').addEventListener("click", function () { mover(-1); });
    carrusel.querySelector('[data-mover="siguiente"]').addEventListener("click", function () { mover(1); });
    prepararArrastre(etapa, mover);
    window.addEventListener("resize", acomodar);
    acomodar();
}

function prepararArrastre(etapa, mover) {
    let inicio = 0;
    let seArrastro = false;

    etapa.addEventListener("click", function (evento) {
        if (seArrastro) {
            evento.preventDefault();
            evento.stopImmediatePropagation();
            seArrastro = false;
        }
    }, true);

    etapa.addEventListener("pointerdown", function (evento) {
        inicio = evento.clientX;
        seArrastro = false;
        etapa.classList.add("is-dragging");
        etapa.setPointerCapture(evento.pointerId);
    });

    etapa.addEventListener("pointerup", function (evento) {
        const diferencia = evento.clientX - inicio;
        etapa.classList.remove("is-dragging");
        if (Math.abs(diferencia) > 35) {
            seArrastro = true;
            mover(diferencia > 0 ? -1 : 1);
        }
    });

    etapa.addEventListener("pointercancel", function () {
        etapa.classList.remove("is-dragging");
    });
}

function mostrarDetalle(plato, indice) {
    const dialogo = document.getElementById("detalle-plato");
    dialogo.querySelector(".dish-dialog-image").src = fotosDePlatos[indice % fotosDePlatos.length];
    dialogo.querySelector(".dish-dialog-image").alt = plato.nombre;
    dialogo.querySelector(".eyebrow").textContent = plato.categoria;
    dialogo.querySelector("h2").textContent = plato.nombre;
    dialogo.querySelector(".dish-dialog-description").textContent = plato.descripcion || "Plato de la casa.";
    dialogo.querySelector(".dish-dialog-price").textContent = "$" + Number(plato.precio).toLocaleString("es-AR");
    dialogo.showModal();
}

document.querySelector(".dish-dialog-close").addEventListener("click", function () {
    document.getElementById("detalle-plato").close();
});

window.renderizarCarruseles = function (platos) {
    if (!platos.length) return;
    prepararCarruselUno(platos);
    prepararCarruselDos(platos);
};