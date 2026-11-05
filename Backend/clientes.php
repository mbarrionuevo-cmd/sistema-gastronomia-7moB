<?php
require_once "../conexion.php";

$metodo = $_SERVER["REQUEST_METHOD"];

if ($metodo == "GET") {

    $sql = "SELECT * FROM clientes WHERE activo = TRUE";
    $consulta = $conexion->query($sql);

    responder($consulta->fetchAll());
}

if ($metodo == "POST") {

    $datos = json_decode(file_get_contents("php://input"), true);

    if (
        empty($datos["nombre"]) ||
        empty($datos["apellido"]) ||
        empty($datos["telefono"])
    ) {
        responder(["error" => "Faltan datos obligatorios"], 400);
    }

    $sql = "INSERT INTO clientes
(documento, nombre, apellido, telefono, email,
direccion, localidad, referencia, activo)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, TRUE)";

    $consulta = $conexion->prepare($sql);

    $consulta->execute([
        $datos["documento"] ?? null,
        $datos["nombre"],
        $datos["apellido"],
        $datos["telefono"],
        $datos["email"] ?? null,
        $datos["direccion"] ?? null,
        $datos["localidad"] ?? null,
        $datos["referencia"] ?? null
    ]);

    responder([
        "mensaje" => "Cliente registrado correctamente",
        "id_cliente" => $conexion->lastInsertId()
    ], 201);
}

responder(["error" => "Método no permitido"], 405);
