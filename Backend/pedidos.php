<?php
require_once "../conexion.php";

$metodo = $_SERVER["REQUEST_METHOD"];

if ($metodo == "GET") {

    $sql = "SELECT p.id_pedido,
CONCAT(c.nombre, ' ', c.apellido) AS cliente,
p.estado_pedido,
p.fecha_hora,
p.direccion_entrega,
p.total,
CONCAT(ca.nombre, ' ', ca.apellido) AS cadete
FROM pedidos p
INNER JOIN clientes c ON p.id_cliente = c.id_cliente
LEFT JOIN cadetes ca ON p.id_cadete = ca.id_cadete
ORDER BY p.fecha_hora DESC";

    $consulta = $conexion->query($sql);

    responder($consulta->fetchAll());
}

if ($metodo == "POST") {

    $datos = json_decode(file_get_contents("php://input"), true);

    if (
        empty($datos["id_cliente"]) ||
        empty($datos["direccion_entrega"]) ||
        empty($datos["detalles"]) ||
        !is_array($datos["detalles"])
    ) {
        responder(["error" => "Datos del pedido incompletos"], 400);
    }

    try {
        $conexion->beginTransaction();

        $total = 0;
        $detalles = [];

        foreach ($datos["detalles"] as $detalle) {

            $cantidad = (int)($detalle["cantidad"] ?? 0);
            $id_plato = (int)($detalle["id_plato"] ?? 0);

            if ($cantidad <= 0 || $id_plato <= 0) {
                throw new Exception("Plato o cantidad inválidos");
            }

            $consulta = $conexion->prepare(
                "SELECT precio FROM platos
WHERE id_plato = ? AND activo = TRUE"
            );

            $consulta->execute([$id_plato]);
            $plato = $consulta->fetch();

            if (!$plato) {
                throw new Exception("El plato no existe o está inactivo");
            }

            $precio = (float)$plato["precio"];
            $subtotal = $precio * $cantidad;
            $total += $subtotal;

            $detalles[] = [
                "id_plato" => $id_plato,
                "cantidad" => $cantidad,
                "precio" => $precio,
                "subtotal" => $subtotal
            ];
        }

        $sql = "INSERT INTO pedidos
(id_cliente, id_cadete, estado_pedido, id_usuario,
fecha_hora, direccion_entrega, referencia_entrega,
observaciones, total)
VALUES (?, ?, 'En preparación', ?, NOW(), ?, ?, ?, ?)";

        $consulta = $conexion->prepare($sql);

        $consulta->execute([
            $datos["id_cliente"],
            $datos["id_cadete"] ?? null,
            $datos["id_usuario"] ?? null,
            $datos["direccion_entrega"],
            $datos["referencia_entrega"] ?? null,
            $datos["observaciones"] ?? null,
            $total
        ]);

        $id_pedido = $conexion->lastInsertId();

        foreach ($detalles as $detalle) {

            $sql = "INSERT INTO detalles_pedidos
(id_pedido, id_plato, cantidad, estado_pedido,
precio_unitario, subtotal, observaciones)
VALUES (?, ?, ?, 'En preparación', ?, ?, ?)";

            $consulta = $conexion->prepare($sql);

            $consulta->execute([
                $id_pedido,
                $detalle["id_plato"],
                $detalle["cantidad"],
                $detalle["precio"],
                $detalle["subtotal"],
                null
            ]);
        }

        $conexion->commit();

        responder([
            "mensaje" => "Pedido registrado correctamente",
            "id_pedido" => $id_pedido,
            "total" => $total
        ], 201);
    } catch (Exception $e) {

        if ($conexion->inTransaction()) {
            $conexion->rollBack();
        }

        responder(["error" => $e->getMessage()], 400);
    }
}

if ($metodo == "PUT") {

    $datos = json_decode(file_get_contents("php://input"), true);

    $estados = [
        "En preparación",
        "Listo",
        "En camino",
        "Entregado"
    ];

    if (
        empty($datos["id_pedido"]) ||
        !in_array($datos["estado_pedido"] ?? "", $estados, true)
    ) {
        responder(["error" => "Pedido o estado inválido"], 400);
    }

    $sql = "UPDATE pedidos
SET estado_pedido = ?
WHERE id_pedido = ?";

    $consulta = $conexion->prepare($sql);

    $consulta->execute([
        $datos["estado_pedido"],
        $datos["id_pedido"]
    ]);

    if ($consulta->rowCount() == 0) {
        responder(["mensaje" => "No se modificó el pedido"]);
    }

    responder(["mensaje" => "Estado del pedido actualizado"]);
}

responder(["error" => "Método no permitido"], 405);
