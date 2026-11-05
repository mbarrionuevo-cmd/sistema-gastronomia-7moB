async function consultarReporte(fecha, idCadete = "") {
    try {
        let url = `../api/reportes.php?fecha=${fecha}`;

        if (idCadete !== "") {
            url += `&id_cadete=${idCadete}`;
        }

        const respuesta = await fetch(url);
        const reporte = await respuesta.json();

        console.log("Reporte de pedidos:", reporte);

        return reporte;

    } catch (error) {
        console.error("Error al consultar reporte:", error);
    }
}

consultarReporte("2026-10-20", 1);