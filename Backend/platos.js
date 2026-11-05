// Pide los platos a PHP y arma la carta con lo que devuelve MySQL.
async function cargarCarta() {
    const contenedor = document.getElementById("menu-contenedor");

    try {
        const platos = await obtenerPlatos();
        if (window.renderizarCarruseles) {
            window.renderizarCarruseles(platos);
        }
        contenedor.textContent = "";

        if (platos.length === 0) {
            contenedor.textContent = "Todavía no hay platos disponibles.";
            return;
        }

        // Agrupamos los platos por categoría, como Entradas o Postres.
        const categorias = {};

        platos.forEach(function (plato) {
            if (!categorias[plato.categoria]) {
                categorias[plato.categoria] = [];
            }

            categorias[plato.categoria].push(plato);
        });

        Object.keys(categorias).forEach(function (categoria) {
            const seccion = document.createElement("section");
            seccion.className = "menu-section section-wrap";
            if (window.observarEntrada) {
                window.observarEntrada(seccion);
            }

            const introduccion = document.createElement("div");
            introduccion.className = "menu-intro";

            const titulo = document.createElement("h2");
            titulo.textContent = categoria;
            introduccion.appendChild(titulo);

            const lista = document.createElement("div");
            lista.className = "menu-list";

            categorias[categoria].forEach(function (plato) {
                const item = document.createElement("article");
                item.className = "menu-item";

                const texto = document.createElement("div");
                const nombre = document.createElement("h3");
                nombre.textContent = plato.nombre;

                const descripcion = document.createElement("p");
                descripcion.textContent = plato.descripcion || "Plato de la casa.";

                const precio = document.createElement("strong");
                precio.textContent = "$" + Number(plato.precio).toLocaleString("es-AR");

                texto.append(nombre, descripcion);
                item.append(texto, precio);
                lista.appendChild(item);
            });

            seccion.append(introduccion, lista);
            contenedor.appendChild(seccion);
        });
    } catch (error) {
        contenedor.textContent = "No se pudo cargar la carta. Revisá PHP y MySQL.";
        console.error(error);
    }
}

cargarCarta();
