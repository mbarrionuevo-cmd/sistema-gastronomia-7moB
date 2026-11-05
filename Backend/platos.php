<?php
require_once "../conexion.php";

// La página web usa GET para pedir los platos activos.
if ($_SERVER["REQUEST_METHOD"] == "GET") {

    $sql = "SELECT p.id_plato, p.nombre, p.descripcion,
p.precio, p.apto_celiacos,
c.nombre AS categoria
FROM platos p
INNER JOIN categorias c
ON p.id_categoria = c.id_categoria
WHERE p.activo = TRUE
ORDER BY p.id_plato ASC";

    $consulta = $conexion->query($sql);

    responder($consulta->fetchAll());
}

responder(["error" => "Método no permitido"], 405);
