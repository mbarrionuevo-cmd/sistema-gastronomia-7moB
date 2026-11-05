<?php

header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$basedatos = "OUTREBLANC";
$usuario = "root";
$password = "";

try {

    $conexion = new PDO(
        "mysql:host=$host;dbname=$basedatos;charset=utf8mb4",
        $usuario,
        $password
    );

    $conexion->setAttribute(
        PDO::ATTR_ERRMODE,
        PDO::ERRMODE_EXCEPTION
    );

    $conexion->setAttribute(
        PDO::ATTR_DEFAULT_FETCH_MODE,
        PDO::FETCH_ASSOC
    );
} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "error" => "Error al conectar con la base de datos"
    ]);

    exit;
}

function responder($datos, $codigo = 200)
{

    http_response_code($codigo);

    echo json_encode(
        $datos,
        JSON_UNESCAPED_UNICODE
    );

    exit;
}
