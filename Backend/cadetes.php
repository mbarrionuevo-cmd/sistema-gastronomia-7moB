<?php
require_once "../conexion.php";

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    $sql = "SELECT * FROM cadetes WHERE activo = TRUE";
    $consulta = $conexion->query($sql);

    responder($consulta->fetchAll());
}

responder(["error" => "Método no permitido"], 405);
