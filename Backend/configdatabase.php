<?php

/*
|--------------------------------------------------------------------------
| Database Configuration
|--------------------------------------------------------------------------
|
| Este archivo se encarga de establecer la conexión entre la aplicación
| y la base de datos MySQL.
|
| La información de conexión se obtiene desde las variables definidas
| en el archivo .env para evitar escribir credenciales directamente
| dentro del código.
|
*/

return [
    'connection' => $_ENV['DB_CONNECTION'] ?? 'mysql',
    'host'       => $_ENV['DB_HOST'] ?? '127.0.0.1',
    'port'       => $_ENV['DB_PORT'] ?? '3306',
    'database'   => $_ENV['DB_DATABASE'] ?? 'proyecto',
    'username'   => $_ENV['DB_USERNAME'] ?? 'root',
    'password'   => $_ENV['DB_PASSWORD'] ?? '',
];
