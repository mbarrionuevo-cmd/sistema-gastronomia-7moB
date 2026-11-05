<?php
require_once "../conexion.php";

if ($_SERVER["REQUEST_METHOD"] != "GET") {
    responder(["error" => "Método no permitido"], 405);
}

$fecha = $_GET["fecha"] ?? date("Y-m-d");
$id_cadete = $_GET["id_cadete"] ?? null;

if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha)) {
    responder(["error" => "Fecha inválida"], 400);
}

$sql = "SELECT p.id_pedido,
p.fecha_hora,
CONCAT(c.nombre, ' ', c.apellido) AS cliente,
CONCAT(ca.nombre, ' ', ca.apellido) AS cadete,
p.estado_pedido,
p.direccion_entrega,
p.total
FROM pedidos p
INNER JOIN clientes c ON p.id_cliente = c.id_cliente
INNER JOIN cadetes ca ON p.id_cadete = ca.id_cadete
WHERE DATE(p.fecha_hora) = ?
AND p.estado_pedido = 'Entregado'";

$parametros = [$fecha];

if ($id_cadete !== null && $id_cadete !== "") {
    $sql .= " AND p.id_cadete = ?";
    $parametros[] = $id_cadete;
}

$sql .= " ORDER BY p.fecha_hora DESC";

$consulta = $conexion->prepare($sql);
$consulta->execute($parametros);

$pedidos = $consulta->fetchAll();

responder([
    "fecha" => $fecha,
    "cantidad_pedidos" => count($pedidos),
    "pedidos" => $pedidos
]);
