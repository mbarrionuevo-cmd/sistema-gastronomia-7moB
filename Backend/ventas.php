<?php
require_once "../conexion.php";

$metodo = $_SERVER["REQUEST_METHOD"];

if ($metodo == "GET") {

    $sql = "SELECT v.id_venta, v.fecha_hora,
v.subtotal, v.descuento, v.total,
v.estado, mp.nombre AS metodo_pago
FROM ventas v
INNER JOIN metodos_pago mp
ON v.id_metodo_pago = mp.id_metodo_pago
ORDER BY v.fecha_hora DESC";

    responder($conexion->query($sql)->fetchAll());
}

if ($metodo == "POST") {

    $datos = json_decode(file_get_contents("php://input"), true);

    if (
        empty($datos["id_pedido"]) ||
        empty($datos["id_metodo_pago"]) ||
        empty($datos["id_usuario"])
    ) {
        responder(["error" => "Faltan datos para registrar la venta"], 400);
    }

    try {
        $conexion->beginTransaction();

        $consulta = $conexion->prepare(
            "SELECT total FROM pedidos WHERE id_pedido = ?"
        );

        $consulta->execute([$datos["id_pedido"]]);
        $pedido = $consulta->fetch();

        if (!$pedido) {
            throw new Exception("El pedido no existe");
        }

        $consulta = $conexion->prepare(
            "SELECT id_venta FROM ventas WHERE id_pedido = ?"
        );

        $consulta->execute([$datos["id_pedido"]]);

        if ($consulta->fetch()) {
            throw new Exception("Este pedido ya tiene una venta registrada");
        }

        $subtotal = (float)$pedido["total"];
        $descuento = (float)($datos["descuento"] ?? 0);

        if ($descuento < 0 || $descuento > $subtotal) {
            throw new Exception("Descuento inválido");
        }

        $total = $subtotal - $descuento;

        $sql = "INSERT INTO ventas
(id_pedido, id_metodo_pago, id_usuario,
fecha_hora, subtotal, descuento, total,
estado, observaciones)
VALUES (?, ?, ?, NOW(), ?, ?, ?, 'Pagado', ?)";

        $consulta = $conexion->prepare($sql);

        $consulta->execute([
            $datos["id_pedido"],
            $datos["id_metodo_pago"],
            $datos["id_usuario"],
            $subtotal,
            $descuento,
            $total,
            $datos["observaciones"] ?? null
        ]);

        $conexion->commit();

        responder([
            "mensaje" => "Venta registrada correctamente",
            "total" => $total
        ], 201);
    } catch (Exception $e) {

        if ($conexion->inTransaction()) {
            $conexion->rollBack();
        }

        responder(["error" => $e->getMessage()], 400);
    }
}

responder(["error" => "Método no permitido"], 405);
