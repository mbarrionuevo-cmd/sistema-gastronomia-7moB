// Primero intenta usar PHP. Si Live Server no puede ejecutar PHP,
// carga la copia de datos de proyecto.sql que está en data/platos.json.
async function obtenerPlatos() {
    let respuesta = null;

    try {
        respuesta = await fetch("platos.php");
    } catch (error) {
        // Live Server sirve archivos, pero no ejecuta PHP.
    }

    const tipoRespuesta = respuesta
        ? respuesta.headers.get("content-type") || ""
        : "";

    if (respuesta && tipoRespuesta.includes("application/json")) {
        const platos = await respuesta.json();

        if (!respuesta.ok || !Array.isArray(platos)) {
            throw new Error("PHP no pudo consultar los platos.");
        }

        return platos;
    }

    const copia = await fetch("data/platos.json");

    if (!copia.ok) {
        throw new Error("No se pudieron cargar los platos.");
    }

    return await copia.json();
}
