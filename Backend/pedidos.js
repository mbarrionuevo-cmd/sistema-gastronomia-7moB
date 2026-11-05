async function consultarPedidos() {
    try {
        const respuesta = await fetch("../api/pedidos.php");
        const pedidos = await respuesta.json();

        console.log("Pedidos registrados:", pedidos);

        return pedidos;

    } catch (error) {
        console.error("Error al consultar pedidos:", error);
    }
}


async function registrarPedido(pedido) {
    try {
        const respuesta = await fetch("../api/pedidos.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pedido)
        });

        const resultado = await respuesta.json();

        console.log(resultado);

        return resultado;

    } catch (error) {
        console.error("Error al registrar pedido:", error);
    }
}


async function cambiarEstado(idPedido, estado) {
    try {
        const respuesta = await fetch("../api/pedidos.php", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_pedido: idPedido,
                estado_pedido: estado
            })
        });

        const resultado = await respuesta.json();

        console.log(resultado);

        return resultado;

    } catch (error) {
        console.error("Error al cambiar estado:", error);
    }
}

consultarPedidos();
