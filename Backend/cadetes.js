async function consultarCadetes() {
    try {
        const respuesta = await fetch("../api/cadetes.php");
        const cadetes = await respuesta.json();

        console.log("Cadetes disponibles:", cadetes);

        return cadetes;

    } catch (error) {
        console.error("Error al consultar cadetes:", error);
    }
}

consultarCadetes();