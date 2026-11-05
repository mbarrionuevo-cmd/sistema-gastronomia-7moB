// Le pide los platos a PHP y los muestra en la página principal.
async function cargarPlatos() {
  const lista = document.getElementById("platos-lista");

  try {
    const platos = await obtenerPlatos();
    lista.textContent = "";

    if (platos.length === 0) {
      lista.textContent = "Todavía no hay platos disponibles.";
      return;
    }

    // Mostramos solo los primeros tres para que la sección sea corta.
    platos.slice(0, 3).forEach(function (plato) {
      const tarjeta = document.createElement("article");
      tarjeta.className = "home-dish";

      const nombre = document.createElement("h3");
      nombre.textContent = plato.nombre;

      const descripcion = document.createElement("p");
      descripcion.textContent = plato.descripcion || plato.categoria;

      const precio = document.createElement("strong");
      precio.textContent = "$" + Number(plato.precio).toLocaleString("es-AR");

      tarjeta.append(nombre, descripcion, precio);
      lista.appendChild(tarjeta);
    });
  } catch (error) {
    lista.textContent = "No se pudieron cargar los platos. Revisá la conexión con PHP y MySQL.";
    console.error(error);
  }
}

cargarPlatos();
