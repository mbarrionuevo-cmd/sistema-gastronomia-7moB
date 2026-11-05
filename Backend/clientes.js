async function consultarClientes() {
    try {
        const respuesta = await fetch("../api/clientes.php");
        const clientes = await respuesta.json();

        console.log("Clientes registrados:", clientes);

        return clientes;

    } catch (error) {
        console.error("Error al consultar clientes:", error);
    }
}


async function registrarCliente(cliente) {
    try {
        const respuesta = await fetch("../api/clientes.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        });

        const resultado = await respuesta.json();

        console.log(resultado);

        return resultado;

    } catch (error) {
        console.error("Error al registrar cliente:", error);
    }
}

consultarClientes();